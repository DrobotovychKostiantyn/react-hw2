import React from 'react';

const Logo = ({ src, width = 60, height = 60 }) => (
  <div>
    <a src={src}>
      <img src={src} width={width} height={height} alt="logo" />
    </a>
  </div>
);

export default Logo;
