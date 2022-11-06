import React from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../stores/categories-store';

export const Categories = observer(() => {
  return (
    <>
      <>
        <div className="categories__wrapper">
          <span
            className={
              categoriesStore.isVisible
                ? 'categories__button rotate'
                : 'categories__button'
            }
            onClick={() => categoriesStore.toggleVisible()}
          >
            &gt;
          </span>
          {categoriesStore.isVisible === false ? (
            <span className="categories__list-title">Search by tags...</span>
          ) : (
            <fieldset className="categories">
              <ul className="categories__list">
                {categoriesStore.categories.map((category, index) => (
                  <Category
                    key={index}
                    category={category}
                    toggleFilter={categoriesStore.toggleFilter}
                    filters={categoriesStore.filters}
                  />
                ))}
              </ul>
            </fieldset>
          )}
        </div>
      </>
    </>
  );
});

export const Category = observer(({ category, toggleFilter, filters }) => {
  return (
    <label className="categories__label">
      <input
        type="checkbox"
        name="categories"
        id={category.name}
        value={category.name}
        checked={filters.includes(category.name)}
        onChange={() => toggleFilter(category.name)}
      />
      {category.name}
    </label>
  );
});
