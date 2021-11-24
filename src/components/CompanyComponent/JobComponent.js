import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Card, Row, Col, Container, Stack, Accordion, useAccordionButton } from "react-bootstrap";
import { getAllCompanies } from '../../services/companyService';
import { useStateValue } from '../../services/ContextProvider';
import { createJobRequest, deleteJobRequest, getjobRequests, updateJobRequest } from '../../services/JobRequestService';

const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <span
            type="button"
            style={{ color: "blue", fontSize: 12 }}
            onClick={decoratedOnClick}
        >
            {children}
        </span>
    );
}

const JobComponent = () => {
    const { companyList, companyDispatch } = useStateValue();

    const [job, setJob] = useState({ company: '', job: '', jobDescription: '' });
    const [newJob, setNewJob] = useState(true);
    const [jobRequests, setJobRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    useEffect(async () => {
        if (!companyList.companyList) {
            await getAllCompanies(companyDispatch);
        }
        getAllJobRequests();
    }, []);

    useEffect(() => {
        getAllJobRequests();
    }, [companyList.companyList])

    useEffect(() => {
        if(companyList.companyList && job.company?.id){
            const c = companyList.companyList.filter(c=>c.id===job.company?.id)[0];
            setJob({...job, company:{...job.company, name: c.companyName}})
        }
    }, [job.company?.id])


    const addAttributes = () => {
        setJob({ ...job, [fieldName]: fieldValue });
        setFieldName('');
        setFieldValue('');
    }

    const removeAttributes = (field) => {
        delete job[field];
        setJob({ ...job });
    }

    const addJobRequest = async () => {
        try {
            const company = job.company;
            const id = await createJobRequest(job);
            setJobRequests([...jobRequests, { ...job, id: id, company:company }])
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllJobRequests = async () => {
        try {
            const allJobRequests = await getjobRequests(companyList.companyList);
            setJobRequests(allJobRequests)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateJobRequest = async () => {
        try {
            const id = job.id;
            const company = job.company;
            await updateJobRequest(job);
            const updatedJobRequests = jobRequests.map(j => j.id === id ? { ...job, id: id, company: company } : j);
            setJobRequests(updatedJobRequests);
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onDeleteJobRequest = async (id, companyId) => {
        try {
            await deleteJobRequest(id, companyId);
            const updatedJobRequests = jobRequests.filter(j => j.id !== id);
            setJobRequests(updatedJobRequests);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ marginTop: 15 }} >
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Job Request Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-4" style={{ backgroundColor: '#ffffff' }}>
                        <Form.Group className="mb-3" controlId="formCompanyName">
                            <Form.Label>Company</Form.Label>
                            <Form.Select defaultValue={job.company?.id} onChange={(e)=>setJob({...job, company:{id:e.target.value}})} >
                                <option>Select Company</option>
                                {companyList.companyList.map(c=><option value={c.id}>{c.companyName}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCompanyEmail">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="Enter Job " value={job.job} onChange={(e) => setJob({ ...job, job: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCompanyContact">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Job Description" value={job.jobDescription} onChange={(e) => setJob({ ...job, jobDescription: e.target.value })} />
                        </Form.Group>


                        {Object.keys(job).map((keyName, i) => (
                            <div>
                                {keyName !== "id" && keyName !== "company" && keyName !== "jobDescription" && keyName !== "job" ? (
                                    <Form.Group className="mb-3" controlId={keyName}>
                                        <Stack direction="horizontal"><Form.Label>{keyName}</Form.Label><span type="button" className="ms-auto" style={{ color: "blue", fontSize: 12 }} onClick={() => removeAttributes(keyName)}>Delete Field</span></Stack>
                                        <Form.Control type="text" value={job[keyName]} onChange={(e) => setJob({ ...job, [keyName]: e.target.value })} />
                                    </Form.Group>
                                ) : (<div></div>)}
                            </div>
                        ))}

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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => newJob ? addJobRequest() : onUpdateJobRequest()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Stack gap={3} className="p-2">

                <Row >
                    <Col md>
                        <Card>
                            <Card.Body>
                                <div>Create new job request</div>
                                <Button style={{ marginTop: 10 }} onClick={() => { setNewJob(true); setJob({ company: '', job: '', jobDescription: '' }); setShowModal(true) }}>Create</Button>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md>
                        <Card>
                            <Card.Body>
                                <div>Total no job request</div>
                                <h2>{jobRequests.length}</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Card>
                            <Card.Header style={{ backgroundColor: '#ffffff' }}><h4>Job Requests</h4></Card.Header>
                            <Card.Body style={{ margin: 10 }}>
                                <Accordion defaultActiveKey="0">
                                    {jobRequests.map((jobRequest, index) => (
                                        <Card >
                                            <Card.Header>
                                                <Row>
                                                    <Col>
                                                        <div>
                                                            <span><strong>Company </strong></span>
                                                            <div>
                                                                <span>{jobRequest.company?.name}</span>
                                                            </div>

                                                        </div></Col>
                                                    <Col>
                                                        <div className="ms-auto">
                                                            <span><strong>Job </strong></span>
                                                            <div>
                                                                <span>{jobRequest.job}</span>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                    <Col xs lg="1" >
                                                        <CustomToggle eventKey={index} >See more</CustomToggle>
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index}>
                                                <Card.Body>
                                                    <div style={{ paddingTop: 10 }}>
                                                        <div><span><strong>Job Description</strong></span></div>
                                                        <div>
                                                            {jobRequest.jobDescription ? (<span>{jobRequest.jobDescription} </span>) : (<span>&nbsp;</span>)}
                                                        </div>
                                                    </div>
                                                    {Object.keys(jobRequest).map((keyName, i) => (
                                                        <div>
                                                            {keyName !== "id" && keyName !== "company" && keyName !== "jobDescription" && keyName !== "job" ? (
                                                                <div style={{ paddingTop: 15 }}>
                                                                    <div><span><strong>{keyName}</strong></span></div>
                                                                    <div>
                                                                        {jobRequest[keyName] ? (<span>{jobRequest[keyName]} </span>) : (<span>&nbsp;</span>)}
                                                                    </div>
                                                                </div>
                                                            ) : (<div></div>)}
                                                        </div>
                                                    ))}
                                                    <div style={{ paddingTop: 10 }}>
                                                        <Button style={{ marginRight: 10 }} size="sm" variant="secondary" onClick={() => { setNewJob(false); setShowModal(true); setJob(jobRequest) }}>
                                                            Edit
                                                        </Button>
                                                        <Button size="sm" variant="danger" onClick={addJobRequest} onClick={() => onDeleteJobRequest(jobRequest.id, jobRequest.company?.id)}>
                                                            Delete
                                                        </Button>
                                                    </div>

                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))}


                                </Accordion>
                            </Card.Body>

                        </Card>
                    </Col>

                </Row>


            </Stack>







        </div>
    )
}

export default JobComponent
