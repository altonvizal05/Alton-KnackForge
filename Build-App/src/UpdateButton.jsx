import React, {useState} from 'react';

const UpdateButton = () => {
  const [content, setContent]= useState('I am learning React');
  const items = ['React','Node.js','Express.js'];

  function handleUpdate() {
    const num = Math.floor(Math.random() * items.length);
    setContent(`I am learning ${items[num]} and hooks as well`);
  }

  return (
    <div>
      <p>{content}</p>
      <button onClick={handleUpdate}>Update Me</button>
    </div>
  );
};

export default UpdateButton;
