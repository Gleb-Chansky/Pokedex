import React from 'react';
import { Pokemons } from './Pokemons';
import { observer } from 'mobx-react';

export const Container = observer(() => {
  return (
    <section className="container">
      <Pokemons />
    </section>
  );
});
