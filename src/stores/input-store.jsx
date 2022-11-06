import { observable, action, makeObservable } from 'mobx';
import paginationStore from './pagination-store';

class InputStore {
  value = '';
  isVisible = false;

  constructor() {
    makeObservable(this, {
      value: observable,
      isVisible: observable,
      handleValueChange: action,
      handleClick: action,
    });
  }

  handleClick = () => {
    this.isVisible = !this.isVisible;
  };

  handleValueChange = (event) => {
    this.value = event.target.value;
    paginationStore.paginate({ selected: 0 });
  };
}
export default new InputStore();
