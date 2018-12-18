import React from 'react';

const FilterMenu = ({ filter, handleChangeFilter }) => (
  <div>
    <label htmlFor="first-name">Filter menu: </label>
    <input
      type="text"
      name="first-name"
      value={filter}
      onChange={handleChangeFilter}
    />
  </div>
);

export default FilterMenu;
