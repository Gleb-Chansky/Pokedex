import React from 'react';
import headerlogo from '../images/headerlogo.png';
import paginationStore from '../stores/pagination-store';
import { Categories } from './Categories';
import { Input } from './Input';
import { observer } from 'mobx-react';

export const Header = observer(() => {
  return (
    <section className="header">
      <div className="header__wrapper container">
        <img
          src={headerlogo}
          alt="{logo}"
          className="header__img-logo"
          onClick={() => paginationStore.paginate({ selected: 0 })}
        />
        <div className="header__search">
          <Categories />
          <Input />
        </div>
      </div>
    </section>
  );
});
