import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignupForm(props) {
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