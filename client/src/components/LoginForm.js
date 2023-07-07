import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginForm(props) {
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