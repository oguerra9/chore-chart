import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// props: handlePageChange(pageName), handleLogin(bool)
export default function Login(props) {

    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleSUChange = (event) => {
        const { name, value } = event.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleLIChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const submitSignup = (event) => {
        event.preventDefault();
        console.log('signing up new user...');
        console.log('Data:');
        console.log(signupData);
        // functionality added to validate data and create new user
        // but for now, we'll just redirect so we can show how the rest of the app works
        let currTime = new Date();
        let currTS = currTime.getTime();
        localStorage.setItem('displayTS', currTS);
        props.handleLogin();
        //props.handlePageChange('Home');
        localStorage.setItem('loggedIn', true);
        //window.location.pathname = '/home';
    };

    const submitLogin = (event) => {
        event.preventDefault();
        console.log('Logging in...');
        console.log('Data:');
        console.log(loginData);
        // functionality added to actually log user in and validate username and password match
        // but for now, we'll just redirect so we can show how the rest of the app works
        let currTime = new Date();
        let currTS = currTime.getTime();
        localStorage.setItem('displayTS', currTS);
        props.handleLogin();
        localStorage.setItem('loggedIn', true);
        //window.location.pathname = '/home'
        //props.handlePageChange('Home');
    };

    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleShowSignup = () => setShowSignup(true);
    const handleHideSignup = () => setShowSignup(false);

    const handleShowLogin = () => setShowLogin(true);
    const handleHideLogin = () => setShowLogin(false);


    // on successful login, initialize localStorage.displayTS at current timeless stamp
    return (
        <>
            <div className='p2'>
                <Button onClick={handleShowSignup} className='m-1'>Sign Up</Button>
                <Button onClick={handleShowLogin} className='m2'>Login</Button>
            </div>

            <Modal show={showSignup} onHide={handleHideSignup}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm handleChange={handleSUChange} submitSignup={submitSignup} signupData={signupData} />
                </Modal.Body>
            </Modal>

            <Modal show={showLogin} onHide={handleHideLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleChange={handleLIChange} submitLogin={submitLogin} loginData={loginData} />
                </Modal.Body>
            </Modal>
        </>
    );
}