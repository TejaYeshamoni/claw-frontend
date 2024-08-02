import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';

const App = () => {
  const [token, setToken] = useState(null);

  if (!token) {
    return (
      <div>
        <Register />
        <Login setToken={setToken} />
      </div>
    );
  }

  return <TodoList token={token} />;
};

export default App;
