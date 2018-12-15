import React from 'react';
import Logo from '../Logo/index';
import Nav from '../Navigation/index';
import UserMenu from '../UserMenu/index';
import logo from '../assets/logo.jpg';
import avatar from '../assets/avatar.png';
import s from './header.module.css';

const Header = () => (
  <header className={s.header}>
    <div className={s.leftSide}>
      <Logo src={logo} />
      <Nav />
    </div>
    <UserMenu name="Bob Ross" src={avatar} />
  </header>
);

export default Header;
