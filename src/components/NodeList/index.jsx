import React from 'react';

const NodeList = ({ notes }) => (
  <ul>
    {notes.map(item => (
      <li key={item.id}>
        {item.text} <p>Rate: {item.rate}</p>
      </li>
    ))}
  </ul>
);

export default NodeList;
