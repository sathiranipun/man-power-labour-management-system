import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { addCompany } from '../../services/companyService';

const AddCompanyComponent = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCompanyAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addCompany({
            companyName: companyName,
            contactNo: contactNo,
            email: email,
            address: address,
        });
        e.target.reset();
        setLoading(false);
    };

    return (
        <div>
            <Form className="p-4" onSubmit={handleCompanyAdd}>
                <Form.Group className="mb-3" controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Company Name"
                        required={true}
                        onChange={(e) => { setCompanyName(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required={true}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyContact">
                    <Form.Label>Company Contact Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Company Contact Number"
                        required={true}
                        onChange={(e) => { setContactNo(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyAddress">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        required={true}
                        onChange={(e) => { setAddress(e.target.value) }} />
                </Form.Group>

                {loading &&
                    <div class="spinner-border text-primary" role="status"></div>
                }

                {!loading &&
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                }
            </Form>
        </div>
    )
}

export default AddCompanyComponent
