// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Routes' as well
import LoginPage from './LoginPage';
import Home from './Home';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div className="App">
        <Routes> {/* Use the 'Routes' element */}
          <Route path="/" element={!user ? <LoginPage onLogin={handleLogin} /> : <Home username={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
