import { observable, makeObservable, action, runInAction } from 'mobx';
import paginationStore from './pagination-store';
import categoriesStore from './categories-store';
import inputStore from './input-store';

class PokemonsStore {
  isLoading = true;
  isError = false;
  pokemonsList = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isError: observable,
      pokemonsList: observable,
      getPokemons: action,
    });
  }

  getPokemons = async () => {
    const res = await fetch(
      `/api/search?page=${paginationStore.currentPage}&limit=${paginationStore.pokemonsPerPage}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filters: categoriesStore.filters,
          searchQuery: inputStore.value,
        }),
      }
    );
    if (res.status < 300) {
      const data = await res.json();
      runInAction(() => {
        this.pokemonsList = data;
        this.isLoading = false;
      });
    } else {
      runInAction(() => {
        this.isError = true;
        this.isLoading = false;
      });
    }
  };
}

export default new PokemonsStore();
