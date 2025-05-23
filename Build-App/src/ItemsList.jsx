import React from 'react';

const ItemsList = () => {
  const items = ['React','Node.js','Express.js'];

  return (
    <ul>
      {items.map((items, index) => (
        <li key={index}>{items}</li>
      ))}
    </ul>
  );
};

export default ItemsList;
