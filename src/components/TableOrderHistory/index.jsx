import React from 'react';

const Table = ({ historyTitles, listHistory }) => (
  <table>
    <tbody>
      <tr>
        {historyTitles.map(item => (
          <th key={item.title}>{item.title}</th>
        ))}
      </tr>
      {listHistory.map(item => (
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.price}</td>
          <td>{item.address}</td>
          <td>{item.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
