import React from 'react';

const HistoryListItem = ({ el: { date, price, address, rating } }) => (
  <div>
    <p>Date: {date}</p>
    <p>Price: {price}</p>
    <p>Address: {address}</p>
    <p>Rating: {rating}</p>
  </div>
);

export default HistoryListItem;
