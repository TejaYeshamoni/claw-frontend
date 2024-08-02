import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/todos', {
        headers: { 'x-access-token': token }
      });
      setTodos(response.data);
    };
    fetchTodos();
  }, [token]);

  const handleAddTodo = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/todos', { description, status }, {
      headers: { 'x-access-token': token }
    });
    setDescription('');
    setStatus('pending');
    const response = await axios.get('http://localhost:5000/todos', {
      headers: { 'x-access-token': token }
    });
    setTodos(response.data);
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add To-Do</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.description} - {todo.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
