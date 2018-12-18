import React from 'react';
import s from './nodeList.module.css';

const NodeList = ({ notes }) => (
  <ul className={s.list}>
    {notes.map(item => (
      <li key={item.id} className={s.listItem}>
        {item.text} <p>Rate: {item.rate}</p>
      </li>
    ))}
  </ul>
);

export default NodeList;
