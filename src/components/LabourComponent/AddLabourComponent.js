import React, { useState } from 'react'
import { Button, Form, Stack } from "react-bootstrap";
import { addLabour } from '../../services/LabourService';

const AddLabourComponent = () => {
    const [labourName, setLabourName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [skills, setSkills] = useState('');
    const [email, setEmail] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    const addAttributes = () => {
        setFieldName('');
        setFieldValue('');
    }

    const handleLabourAdd = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        await addLabour({
            name: labourName,
            contactNo: contactNo,
            address: address,
            email: email,
            skills: skills.split(",").map(e => e.trim())
        });
        e.target.reset();
        setSubmitLoading(false);
    }

    return (
        <div>
            <Form className="p-4" onSubmit={handleLabourAdd} >
                <Form.Group className="mb-3" controlId="formLabourName">
                    <Form.Label>Labour Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Labour Name"
                        required={true}
                        onChange={(e) => { setLabourName(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLabourContact">
                    <Form.Label>Labour Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Labour Email Address"
                        required={true}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLabourContact">
                    <Form.Label>Labour Contact Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Labour Contact Number"
                        required={true}
                        onChange={(e) => { setContactNo(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLabourAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        required={true}
                        onChange={(e) => { setAddress(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLabourSkills">
                    <Form.Label>Labour Skills</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Skills: Seperate each skill with a comma (,)"
                        required={true}
                        onChange={(e) => { setSkills(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCompanyContact">
                    <Form.Label>Add Custom Fields</Form.Label>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} placeholder="Enter Field Name" />
                        <Form.Control type="text" value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} placeholder="Enter Field Value" />
                        <Button onClick={() => addAttributes()}>
                            Add
                        </Button>
                    </Stack>
                </Form.Group>


                {submitLoading &&
                    <div class="spinner-border text-primary" role="status"></div>
                }

                {!submitLoading &&
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                }
            </Form>
        </div>
    );
}

export default AddLabourComponent;
