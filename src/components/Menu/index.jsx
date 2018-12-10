import React from 'react';
import MenuListItem from '../MenuListItem/index';

const Menu = ({ list, deleteClick, moreClick }) => {
  return (
    <ul>
      {list.map(el => {
        return (
          <li key={el.id}>
            <MenuListItem el={el} />

            <button type="button" onClick={() => deleteClick(el.id)}>
              Delete
            </button>
            <button type="button" onClick={() => moreClick(el.id)}>
              Show more info
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
