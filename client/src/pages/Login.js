import React, { useState } from 'react';
//import LoginForm from '../components/LoginForm';
//import SignupForm from '../components/SignupForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DS from '../services/dataService';


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
        let userData = {
            username: signupData.username,
            password: signupData.password,
            name: `${signupData.first_name} ${signupData.last_name}`
        };
        // functionality added to validate data and create new user
        // but for now, we'll just redirect so we can show how the rest of the app works
        (DS.getUserList()).then((response) => {
            console.log('user list response');
            console.log(response);
            // get user list to make sure username is not already used
            // might already be handled in backend, not really sure
        });
        (DS.addUser(userData)).then((response) => {
            console.log('adding user...');
            console.log(response);
        });
        handleHideSignup();
        let currTime = new Date();
        let currTS = currTime.getTime();
        localStorage.setItem('displayTS', currTS);
        props.handleLogin();
        //props.handlePageChange('Home');
        localStorage.setItem('loggedIn', true);
        window.location.pathname = '/';
    };

    const submitLogin = (event) => {
        event.preventDefault();
        console.log('Logging in...');
        console.log('Data:');
        console.log(loginData);
        // get user list just to see what we're working with
        (DS.getUserList()).then((response) => {
            console.log('user list');
            console.log(response);
        });

        // actual functionality will be something more like this once we know that endpoint has been established
        (DS.getUserByUsername(loginData.username)).then((response) => {
            console.log(`response from looking for user ${loginData.username}:`);
            console.log(response);
            // if user is not found
                // show user does not exist alert
            // else if user is found, check password
                // if loginData.password != userData.password
                    // show incorrect password alert
                // else if loginData.password === userData.password
                    // set localStorage.setItem('currUserId', userData.id)
                    // redirect to home page using
                        // props.handleLogin()
                        // localStorage.setItem('loggedIn', true)
        })

        let currTime = new Date();
        let currTS = currTime.getTime();
        localStorage.setItem('displayTS', currTS);
        //props.handleLogin();
        //localStorage.setItem('loggedIn', true);
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
            <div className='p2' id="loginPageContainer">
                <Button onClick={handleShowSignup} className='m-1 mt-3'>Sign Up</Button>
                <Button onClick={handleShowLogin} className='m-1 mt-3'>Login</Button>
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

function SignupForm(props) {
    return (
        <Form id="appForm">
            <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="first_name" onChange={props.handleChange} value={props.signupData.first_name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="last_name" onChange={props.handleChange} value={props.signupData.last_name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={props.handleChange} value={props.signupData.username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" onChange={props.handleChange} value={props.signupData.password} />
            </Form.Group>
            <Button id="appButton" onClick={props.submitSignup}>Sign Up</Button>
        </Form>
    );
}

function LoginForm(props) {
    return (
        <Form id="appForm">
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={props.handleChange} value={props.loginData.username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" onChange={props.handleChange} value={props.loginData.password} />
            </Form.Group>
            <Button id="appButton" onClick={props.submitLogin}>Login</Button>
        </Form>
    );
}