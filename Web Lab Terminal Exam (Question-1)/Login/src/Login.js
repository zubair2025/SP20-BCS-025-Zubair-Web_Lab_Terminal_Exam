import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://dummyjson.com/auth/login', { username, password }).then((res) => {
      localStorage.setItem('token', res.data.token);
    });
    alert("Logged In Succeffully");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;