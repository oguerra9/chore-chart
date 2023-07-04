import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './components/Nav';

export default function App() {
  let pageName = window.location.pathname.split('/')[1];
  console.log(`page name = ${pageName}`);

  const [currentPage, setCurrentPage] = useState(pageName);
  const [loggedIn, setLoggedIn] = useState(true);

  const handlePageChange = (page) => setCurrentPage(page);

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    console.log(`current page = ${currentPage}`);
    if (!loggedIn || currentPage === '') {
      return <Login handlePageChange={handlePageChange} handleLogin={handleLogin} />;
    } else {

      if (currentPage === 'calendar') {
        console.log(`page === calendar`);
        return <Calendar handlePageChange={handlePageChange} />;
      } else {
        console.log(`page === home`);
        return <Home handlePageChange={handlePageChange} />;
      }
    }
  };



  const handleLogin = (success) => {
    if (success === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <Nav handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </div>
  );
}