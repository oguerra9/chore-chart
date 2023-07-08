import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [mainRefresh, setMainRefresh] = useState(true);

  const handleLogin = () => {
    setLoggedIn('true');
    window.location.pathname = '/';
  };


  const handleLogout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('currUserId');
    localStorage.removeItem('currCalendarTitle');
    localStorage.removeItem('userCalId');
    setLoggedIn('false');
  }

  const toggleMainRefresh = () => {
    if (mainRefresh === true) {
      setMainRefresh(false);
    } else {
      setMainRefresh(true);
    }
  }

  useEffect(() => {
    if (localStorage.hasOwnProperty('loggedIn')) {
      setLoggedIn(localStorage.getItem('loggedIn'));
    }
  }, [loggedIn, mainRefresh]);

  return (
    <div id="fullAppContainer">
    <HashRouter basename="/">

      <div id="pageHeader" className='d-flex justify-content-between p-3'>
        <h1>Chore Chart</h1>
        {(loggedIn === 'true') ? (
          <Link to="/"><Button onClick={handleLogout}>Logout</Button></Link>
          
        ) : (<></>)}
      </div>

      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} toggleMainRefresh={toggleMainRefresh} />}/>
        {loggedIn === 'true' ? (
          <>
          <Route path="/home" element={<Home />}/>
          <Route path="/calendar/:id" element={<Calendar />} />
          <Route path="/" element={<Home />} />
          </>
        ) : (
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        )}
      </Routes>
    </HashRouter>
    </div>
);
}