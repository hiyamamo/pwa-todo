import React from 'react';
const TodoItem = ({todo}) => {
  return (
    <div>
      <input type="checkbox" />
      <label>{todo.title}</label>
      <button>x</button>
    </div>
  );
}

export default TodoItem;
