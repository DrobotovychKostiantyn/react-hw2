import React from 'react';
import HistoryListItem from './HistoryListItem/index';
import s from './history.module.css';

const History = ({ list, deleteClick, moreClick }) => (
  <div>
    <h2 className={s.title}>Order History</h2>
    <ul className={s.list}>
      {list.map(el => (
        <li key={el.id} className={s.listItem}>
          <HistoryListItem el={el} />

          <button type="button" onClick={() => deleteClick(el.id)}>
            Delete
          </button>
          <button type="button" onClick={() => moreClick(el.id)}>
            Show more info
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default History;
