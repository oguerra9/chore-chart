import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Navi from './components/Navi';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";

import Button from 'react-bootstrap/Button';


export default function App() {
  // let pageName = window.location.pathname.split('/')[1];
  // console.log(`page name = ${pageName}`);

  // const [currentPage, setCurrentPage] = useState(pageName);
  // const [loggedIn, setLoggedIn] = useState(true);

  // const handlePageChange = (page) => setCurrentPage(page);

  // // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  // const renderPage = () => {
  //   console.log(`current page = ${currentPage}`);
  //   if (!loggedIn || currentPage === '') {
  //     return <Login handlePageChange={handlePageChange} handleLogin={handleLogin} />;
  //   } else {

  //     if (currentPage === 'calendar') {
  //       console.log(`page === calendar`);
  //       return <Calendar handlePageChange={handlePageChange} />;
  //     } else {
  //       console.log(`page === home`);
  //       return <Home handlePageChange={handlePageChange} />;
  //     }
  //   }
  // };



  // const handleLogin = (success) => {
  //   if (success === true) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // };

  // return (
  //   <div>
  //     {/* We are passing the currentPage from state and the function to update it */}
  //     <Nav handlePageChange={handlePageChange} />
  //     {/* Here we are calling the renderPage method which will return a component  */}
  //     {renderPage()}
  //   </div>
  // );
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn('true');
  };

  const handleLogout = () => {
    localStorage.setItem('loggedIn', false);
    setLoggedIn('false');
    //window.location.pathname = '/login';
  }

  useEffect(() => {
    console.log(loggedIn);
    if (localStorage.hasOwnProperty('loggedIn')) {
      setLoggedIn(localStorage.getItem('loggedIn'));
    }
    console.log(loggedIn);
  }, [loggedIn]);

  // return (
  //   <Router>
  //     <div>
        // <div id="pageHeader" className='d-flex justify-content-between p-3'>
        //   <h1>Chore Chart</h1>
        //   {(loggedIn === 'true') ? (
        //     <Button onClick={handleLogout}>Logout</Button>
        //   ) : (<></>)}
        // </div>
  //     <Routes>
  //       <Route 
  //         path="/" 
  //         element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
  //       />
  //       <Route 
  //         path="/login" 
  //         element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
  //       />
  //       <Route 
  //         path="/home" 
  //         element={<Home loggedIn={loggedIn} />}
  //       />
  //       <Route 
  //         path="/calendar/:id" 
  //         element={<Calendar loggedIn={loggedIn} />}
  //       />
  //     </Routes>
  //     </div>
  //   </Router>
  // );
  return (
    <div id="fullAppContainer">

    
    <HashRouter basename="/">
      {/* <nav>
        <div className='d-flex'>
          <div className='m-2'>
            <Link to="/welcome">Welcome</Link>
          </div>
          <div className='m-2'>
            <Link to="/projects">Projects</Link>
          </div>
          <div className='m-2'>
            <Link to="/resume">Resume</Link>
          </div>
        </div>
      </nav> */}
      <div id="pageHeader" className='d-flex justify-content-between p-3'>
        <h1>Chore Chart</h1>
        {(loggedIn === 'true') ? (
          <Link to="/"><Button onClick={handleLogout}>Logout</Button></Link>
          
        ) : (<></>)}
      </div>

      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />}/>
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