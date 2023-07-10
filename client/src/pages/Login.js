import React, { useState } from 'react';
//import LoginForm from '../components/LoginForm';
//import SignupForm from '../components/SignupForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import DS from '../services/dataService';


// props: handlePageChange(pageName), handleLogin(bool)
export default function Login(props) {

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
                    <SignupForm handleHideSignup={handleHideSignup} handleLogin={props.handleLogin} toggleMainRefresh={props.toggleMainRefresh} />
                </Modal.Body>
            </Modal>

            <Modal show={showLogin} onHide={handleHideLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleHideLogin={handleHideLogin} handleLogin={props.handleLogin} toggleMainRefresh={props.toggleMainRefresh} />
                </Modal.Body>
            </Modal>
        </>
    );
}

// props = handleHideSignup
function SignupForm(props) {
    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
    });

    const [userSearchResult, setUserSearchResult] = useState([]);
    const [showSUAlert, setShowSUAlert] = useState(false);
    const [showExistsAlert, setShowExistsAlert] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const submitSignup = async (event) => {
        event.preventDefault();

        let searchResult = await (DS.getUserByUsername(signupData.username)).then((response) => {
            console.log('response');
            console.log(response);
            return response.data;
        });

        let uniqueUsername = true;

        if (searchResult.length === 0) {
            // username does not already exist
            uniqueUsername = true;
        } else {
            // username already in use
            setShowExistsAlert(true);
            uniqueUsername = false;
        }

        if (uniqueUsername) {
            await (DS.addUser(signupData)).then((response) => {
                console.log('adding user...');
                console.log(response);
                
                localStorage.setItem('currUserId', response.data[0].user_id)
                props.handleHideSignup();
                let currTime = new Date();
                let currTS = currTime.getTime();
                localStorage.setItem('displayTS', currTS);
                localStorage.setItem('loggedIn', true);
                props.handleLogin();
                
                
            }).then(window.location.pathame='/');
        }        
    };

    return (
        <Form id="appForm">
            {showSUAlert ? (
                <Alert>Signup Error</Alert>
            ) : (<></>)}
            {showExistsAlert ? (
                <Alert>Username already in use</Alert>
            ) : (<></>)}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={handleChange} value={signupData.username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" onChange={handleChange} value={signupData.password} />
            </Form.Group>
            <Button id="appButton" onClick={submitSignup}>Sign Up</Button>
        </Form>
    );
}

function LoginForm(props) {

    const [showDNE, setShowDNE] = useState(false);
    const [showInvalidPass, setShowInvalidPass] = useState(false);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });

        if (showDNE === true) {
            setShowDNE(false);
        }

        if (showInvalidPass === true) {
            setShowInvalidPass(false);
        }
    };


    
    const submitLogin = (event) => {
        event.preventDefault();
        console.log('Logging in...');

        // actual functionality will be something more like this once we know that endpoint has been established
        (DS.getUserByUsername(loginData.username)).then((response) => {
            if (response.data.length === 0) {    // user is not found
                setShowDNE(true);
            } else {
                let userDocData = response.data[0];
                if (loginData.password != userDocData.password) {
                    // user's saved password does not match password entered in login attempt
                    setShowInvalidPass(true);
                } else {
                    localStorage.setItem('currUserId', userDocData.user_id);

                    let currTime = new Date();
                    let currTS = currTime.getTime();
                    localStorage.setItem('displayTS', currTS);
                    localStorage.setItem('loggedIn', true);
                    props.handleLogin();
                    window.location.pathname = '/chore-chart/';
                    
                }
            }
        });
    };


    return (
        <Form id="appForm">
            {showDNE ? (
                <Alert>Username not found</Alert>
            ) : (<></>)}
            {showInvalidPass ? (
                <Alert>Incorrect Password</Alert>
            ) : (<></>)}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={handleChange} value={loginData.username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" onChange={handleChange} value={loginData.password} />
            </Form.Group>
            <Button id="appButton" onClick={submitLogin}>Login</Button>
        </Form>
    );
}