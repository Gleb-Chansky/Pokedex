import React, { useEffect } from 'react';
import pokemonsStore from '../stores/pokemons-store';
import categoriesStore from '../stores/categories-store';
import paginationStore from '../stores/pagination-store';
import inputStore from '../stores/input-store';
import { observer } from 'mobx-react-lite';
import { Header } from './Header';
import { Pokemons } from './Pokemons';
import { Error } from './Error';
import { Loading } from './Loading';

export const Pokedex = observer(() => {
  useEffect(() => {
    categoriesStore.getCategories();
  }, []);
  useEffect(() => {
    pokemonsStore.getPokemons();
  }, [
    paginationStore.currentPage,
    paginationStore.pokemonsPerPage,
    inputStore.value,
    categoriesStore.filters,
  ]);

  return (
    <>
      {pokemonsStore.isLoading === true ? (
        <Loading />
      ) : (
        <>
          {pokemonsStore.isError === false ? (
            <>
              <Header />
              <div onClick={() => categoriesStore.makeInvisible()}>
                <Pokemons />
              </div>
            </>
          ) : (
            <Error />
          )}
        </>
      )}
    </>
  );
});
