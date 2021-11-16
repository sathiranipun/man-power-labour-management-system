import React from 'react'
import { Button, Form } from "react-bootstrap";
import './LoginComponent.css'

const LoginComponent = () => {
    return (
        <div>
            <div className="row login-background">
                <div className="col">
                </div>
                <div className="col-6 p-4 login-card">
                    <div className="card">
                        <Form className="p-4">

                            <Form.Group className="mb-3" controlId="formCompanyEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyContact">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
