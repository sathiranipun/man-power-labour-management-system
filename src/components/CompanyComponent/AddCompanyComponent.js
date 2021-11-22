import React from 'react'
import { Button, Form } from "react-bootstrap";

const AddCompanyComponent = () => {
    return (
        <div>
            <Form className="p-4">
                <Form.Group className="mb-3" controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyEmail">
                <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyContact">
                <Form.Label>Company Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Company Contact Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyAddress">
                <Form.Label>Company Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddCompanyComponent
