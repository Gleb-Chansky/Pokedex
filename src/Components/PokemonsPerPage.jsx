import React from 'react';
import { observer } from 'mobx-react-lite';
import paginationStore from '../stores/pagination-store';
import pokemonsStore from '../stores/pokemons-store';

const PaginationList = observer(() => {
  return (
    <>
      {pokemonsStore.pokemonsList.resultPokemons.length !== 0 ? (
        <>
          <section>
            <div className="card__list-per-page">
              {paginationStore.setPokemonsPerPage.map((item, index) => (
                <label
                  key={index}
                  htmlFor={`itemsPerPage${item}`}
                  className="card__list-per-page-number"
                >
                  <input
                    type="radio"
                    id={`itemsPerPage${item}`}
                    name="perPage"
                    value={item}
                    checked={paginationStore.pokemonsPerPage === item}
                    onChange={() => paginationStore.chooseNumbersPerPage(item)}
                  />
                  {item}/per page
                </label>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
});

export const PokemnsPerPage = () => {
  return <PaginationList />;
};
