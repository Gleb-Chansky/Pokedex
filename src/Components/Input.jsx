import React from 'react';
import loupe from '../images/loupe.svg';
import { observer } from 'mobx-react-lite';
import inputStore from '../stores/input-store';

export const InputLine = observer(() => {
  return (
    <div className="header__input-wrapper">
      <img
        src={loupe}
        alt="logo"
        className="header__loupe"
        onClick={() => inputStore.handleClick()}
      />
      <input
        type="text"
        className={
          inputStore.isVisible ? 'header__input visible' : 'header__input'
        }
        placeholder="Search pokemon"
        onChange={inputStore.handleValueChange}
      />
    </div>
  );
});

export const Input = () => {
  return <InputLine />;
};
