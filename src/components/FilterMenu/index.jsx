import React from 'react';

const FilterMenu = ({ filter, handleChangeFilter }) => (
  <div>
    <span>Filter:</span>
    <input type="text" value={filter} onChange={handleChangeFilter} />
  </div>
);

export default FilterMenu;
