import { observable, action, makeObservable, runInAction } from 'mobx';
import pokemonsStore from './pokemons-store';
import paginationStore from './pagination-store';

class CategoriesStore {
  categories = [];

  filters = [];

  isVisible = false;

  constructor() {
    makeObservable(this, {
      categories: observable,
      filters: observable,
      isVisible: observable,
      toggleVisible: action,
      makeInvisible: action,
      getCategories: action,
      toggleFilter: action,
    });
  }

  toggleVisible = () => {
    this.isVisible = !this.isVisible;
  };

  makeInvisible = () => {
    this.isVisible = false;
  };

  getCategories = async () => {
    const res = await fetch('api/categories');
    if (res.status < 300) {
      const data = await res.json();
      runInAction(() => {
        this.categories = data.results;
      });
    } else {
      runInAction(() => {
        pokemonsStore.isError = true;
      });
    }
  };

  toggleFilter = (category) => {
    paginationStore.paginate({ selected: 0 });
    if (this.filters.includes(category)) {
      this.filters = this.filters.filter((cat) => cat !== category);
    } else {
      this.filters = [...this.filters, category];
    }
  };
}

export default new CategoriesStore();
