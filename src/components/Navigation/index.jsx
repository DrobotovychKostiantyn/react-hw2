import React from 'react';
import s from './navigation.module.css';

const Nav = () => (
  <nav className={s.nav}>
    <ul className={s.navList}>
      <li>
        <a href="">Item 1</a>
      </li>
      <li>
        <a href="">Item 2</a>
      </li>
      <li>
        <a href="#">Item 3</a>
      </li>
    </ul>
  </nav>
);

export default Nav;
