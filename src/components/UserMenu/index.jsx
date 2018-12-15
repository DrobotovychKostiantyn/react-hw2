import React from 'react';
import s from './userMenu.module.css';

const UserMenu = ({ src, name }) => (
  <div className={s.userMenu}>
    <img src={src} width="100" height="100" alt="Avatar" />
    <p>{name}</p>
  </div>
);

export default UserMenu;
