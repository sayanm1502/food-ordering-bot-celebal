// src/Login.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a simple login logic
    if (username === 'sayan' && password === '12345') {
      // If the username and password are correct, call the onLogin function
      onLogin(username);
    } else {
      // If the username or password is incorrect, show an error message
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1><b><u>Welcome to Fast Food Dhaba</u></b></h1>
      <p><i>
       Fast Food Dhaba is your one-stop solution for delicious food. We offer a variety of fast food cuisines
        to satisfy your taste buds. </i>
      </p>
      <p>Contact us at: contact@ffdhaba.com</p>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
