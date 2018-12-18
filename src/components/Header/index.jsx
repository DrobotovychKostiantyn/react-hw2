import React from 'react';
import Logo from './Logo/index';
import Nav from './Navigation/index';
import UserMenu from './UserMenu/index';
import s from './header.module.css';

const Header = () => (
  <header className={s.header}>
    <div className={s.leftSide}>
      <Logo />
      <Nav />
    </div>
    <UserMenu />
  </header>
);

export default Header;
