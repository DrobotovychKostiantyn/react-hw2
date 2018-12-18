import React from 'react';
import logo from '../../assets/logo.jpg';
import s from './logo.module.css';

const Logo = () => (
  <div>
    <a href="/">
      <img src={logo} alt="logo" className={s.logoImg} />
    </a>
  </div>
);

export default Logo;
