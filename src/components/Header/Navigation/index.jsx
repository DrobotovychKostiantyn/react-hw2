import React from 'react';
import navItems from '../../config/nav-item.json';
import s from './navigation.module.css';

const Nav = () => (
  <nav className={s.nav}>
    <ul className={s.navList}>
      {navItems.map(navItem => (
        <li key={navItem.id}>
          <a href={navItem.link} className={s.navLink}>
            {navItem.navItem}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
