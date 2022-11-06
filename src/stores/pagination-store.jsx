import { observable, action, computed, makeObservable } from 'mobx';
import pokemonsStore from './pokemons-store';

class PaginationStore {
  currentPage = 1;
  pokemonsPerPage = 20;
  setPokemonsPerPage = [20, 50, 100];

  constructor() {
    makeObservable(this, {
      currentPage: observable,
      pokemonsPerPage: observable,
      setPokemonsPerPage: observable,
      totalPages: computed,
      paginate: action,
      chooseNumbersPerPage: action,
    });
  }

  get totalPages() {
    return (
      pokemonsStore.pokemonsList.totalPokemons.total / this.pokemonsPerPage
    );
  }

  paginate = (event) => {
    this.currentPage = event.selected + 1;
  };

  chooseNumbersPerPage = (number) => {
    this.pokemonsPerPage = number;
    this.paginate({ selected: 0 });
  };
}
export default new PaginationStore();
