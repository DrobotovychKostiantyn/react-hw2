import React from 'react';

const Menu = ({ menuList }) => (
  <ul>
    {menuList.map(({ id, image, name, price }) => (
      <li key={id}>
        <img src={image} alt="food" width="100" height="80" />
        <p>Name: {name}</p>
        <p>Price: {price}</p>
      </li>
    ))}
  </ul>
);

export default Menu;
