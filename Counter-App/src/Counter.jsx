
import React, { useState } from 'react';
import './index.css'; 

const Counter = () => {
  const [count, setCount] = useState(0);
  const min = 0;
  const max= 25;

  const increment = () => {
    if (count < max) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > min) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={decrement} disabled={count === min} className="counter-btn">-</button>
        <button onClick={increment} disabled={count === max} className="counter-btn">+</button>
      </div>
    </div>
  );
};

export default Counter;
