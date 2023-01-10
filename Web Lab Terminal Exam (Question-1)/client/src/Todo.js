import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/todos', { todo }).then((res) => {
      setTodos([...todos, res.data]);
      setTodo('');
    });
  };

  const handleEdit = (id,t) => {
    setTodo(t)
    axios.put(`http://localhost:5000/api/todos/${id}`, {todo:todo}).then((res) => {
      setTodos(todos.map((t) => t._id !== id ? t : {_id:id,todo:todo}));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then((res) => {
      setTodos(todos.filter((t) => t._id !== id));
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <a href='/login' >Login</a><br/>
        <label>
          Todo:
          <input type="text" value={todo} onChange={handleChange} />
        </label>
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.todo}
            <button onClick={() => handleEdit(todo._id,todo.todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;