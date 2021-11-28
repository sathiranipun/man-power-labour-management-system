import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { login } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css'

const LoginComponent = () => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="row login-background justify-content-center ">

                {/* <div className="col">
                </div> */}
                <h2 className="text-center my-4 pt-4">Man Power Labour Management System</h2>
                <div className="col-6 p-4 login-card ">
                    <div className="card">
                        <Form className="p-4" onSubmit={(e) => handleLogin(e)}>

                            <Form.Group className="mb-3" controlId="formCompanyEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyContact">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
                {/* <div className="col">
                </div> */}
            </div>
        </div>
    )
}

export default LoginComponent
