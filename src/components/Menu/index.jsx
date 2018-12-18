import React from 'react';
import s from './menu.module.css';

const Menu = ({ menuList }) => (
  <div>
    <h2 className={s.title}>Menu</h2>
    <ul className={s.list}>
      {menuList.map(({ id, image, name, price }) => (
        <li key={id} className={s.listItem}>
          <img src={image} alt="food" className={s.img} />
          <p>Name: {name}</p>
          <p>Price: {price}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Menu;
