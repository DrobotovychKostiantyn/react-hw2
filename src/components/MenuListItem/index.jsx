import React from 'react';

const MenuListItem = ({ el: { date, price, address, rating } }) => {
  return (
    <div>
      <p>Date: {date}</p>
      <p>Price: {price}</p>
      <p>Address: {address}</p>
      <p>Rating: {rating}</p>
    </div>
  );
};

export default MenuListItem;
