import React from 'react';
import HistoryListItem from '../HistoryListItem/index';

const History = ({ list, deleteClick, moreClick }) => {
  return (
    <ul>
      {list.map(el => {
        return (
          <li key={el.id}>
            <HistoryListItem el={el} />

            <button type="button" onClick={() => deleteClick(el.id)}>
              Delete
            </button>
            <button type="button" onClick={() => moreClick(el.id)}>
              Show more info
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default History;
