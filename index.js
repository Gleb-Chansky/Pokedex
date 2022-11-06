const express = require('express');
const path = require('path');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const read = promisify(readFile);
const write = promisify(writeFile);
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname + '/public')));

const pokemonsJSON = path.resolve(__dirname, './database/pokemons.json');
const categoriesJSON = path.resolve(__dirname, './database/categories.json');

app.get('/api/categories', async (req, res) => {
  const localCategories = await read(categoriesJSON);
  const categoriesList = JSON.parse(localCategories);

  if (Object.entries(categoriesList).length !== 0) {
    res.send(localCategories);
  } else {
    const res = await fetch('https://pokeapi.co/api/v2/type/');
    const data = await res.json();

    await write(categoriesJSON, JSON.stringify(data), 'utf-8', (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.send(data);
  }
});

app.post('/api/search', async (req, res) => {
  const localPokemons = await read(pokemonsJSON);
  const pokemonsList = JSON.parse(localPokemons);
  if (Object.entries(pokemonsList).length === 0) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=900');
    const pokemons = await res.json();
    const unfilteredData = await Promise.all(
      pokemons.results.map((pokemon) =>
        fetch(pokemon.url).then((data) => data.json())
      )
    );

    const filteredData = await unfilteredData.map(
      (item) =>
        new Object({
          id: item.id,
          name: item.name,
          types: item.types,
          stats: item.stats,
          abilities: item.abilities,
        })
    );

    await write(pokemonsJSON, JSON.stringify(filteredData), 'utf-8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const result = await pokemonsList.filter((pokemon) => {
    if (req.body.filters.length === 0 && !req.body.searchQuery) {
      return pokemonsList;
    } else if (req.body.filters.length === 0) {
      return pokemon.name
        .toLowerCase()
        .includes(req.body.searchQuery.toLowerCase());
    } else if (!req.body.searchQuery) {
      return req.body.filters.some((filter) =>
        pokemon.types.some((type) => type.type.name === filter)
      );
    } else {
      return (
        pokemon.name
          .toLowerCase()
          .includes(req.body.searchQuery.toLowerCase()) &&
        req.body.filters.some((filter) =>
          pokemon.types.some((type) => type.type.name === filter)
        )
      );
    }
  });

  const pokemonsLength = result.length;
  const resultPokemons = {};
  resultPokemons.totalPokemons = {
    total: pokemonsLength,
  };
  resultPokemons.resultPokemons = result.slice(startIndex, lastIndex);
  res.send(resultPokemons);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT} `);
});
