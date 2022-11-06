import React, { useState } from 'react';
import { Pagination } from './Pagination';
import pokemonsStore from '../stores/pokemons-store';
import { PokemnsPerPage } from './PokemonsPerPage';
import { observer } from 'mobx-react';

export const Pokemons = observer(() => {
  return (
    <>
      <section className="card__list">
        <div className="card__list-wrapper container">
          {pokemonsStore.pokemonsList.resultPokemons.length === 0 ? (
            <h1 className="card__list-title">
              There is no such pokemon. Try it again.
            </h1>
          ) : (
            pokemonsStore.pokemonsList.resultPokemons.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))
          )}
        </div>
        <PokemnsPerPage />
        <Pagination />
      </section>
    </>
  );
});

export const Pokemon = ({ pokemon, handleClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const idNumber = pokemon.id.toString().padStart(3, '0');

  handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <li onClick={handleClick} key={pokemon.id} className="card">
      <h1 className="card__title">{pokemon.name}</h1>
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idNumber}.png`}
        alt="{photo}"
        className="card__img"
        width="200"
        height="200"
      />
      <div className="card__description">
        <h1 className="card__description-title">type</h1>
        <div className="card__description-wrapper">
          {pokemon.types.map((data) => {
            return (
              <p
                className={`card__description-text ${data.type.name}`}
                key={data.type.name}
              >
                {data.type.name}
              </p>
            );
          })}
        </div>
        {isVisible ? (
          <div className="card__stats">
            {pokemon.stats.map((data, index) => {
              if (index != 3 && index != 4) {
                return (
                  <div
                    className={`card__stats-wrapper ${data.stat.name}`}
                    key={index}
                  >
                    <p className="card__stats-text">{data.stat.name}:</p>
                    <p className="card__stats-text">{data.base_stat}</p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ) : (
          <div className="card__ability">
            <h1 className="card__ability-title">ability:</h1>
            <div className="card__ability-wrapper">
              {pokemon.abilities.map((data, index) => {
                return (
                  <p className="card__ability-text" key={data.ability.name}>
                    {index + 1}.{data.ability.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
