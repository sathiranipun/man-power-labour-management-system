import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalBody, Table, Button, Alert } from 'react-bootstrap'
import { getAllCompanies } from '../../services/companyService';
import { useStateValue } from '../../services/ContextProvider'
import { assignALabour, getjobRequests } from '../../services/JobRequestService';
import { deleteLabour, getAllLabours, updateLabour } from '../../services/LabourService';


const LabourListComponent = () => {
    const [assignModalShow, setAssignModalShow] = useState(false);
    const handleClose = () => setAssignModalShow(false);
    const handleShow = () => setAssignModalShow(true);

    const {
        labourState,
        labourDispatch,
        companyList,
        companyDispatch,
    } = useStateValue();
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deletingLabour, setDeletingLabour] = useState({
        name: '',
        id: ''
    });
    const [jobList, setjobList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedJob, setselectedJob] = useState(null);
    const [selectedLabour, setselectedLabour] = useState(null);
    const [assignLoading, setassignLoading] = useState(false);

    const [updatingLabour, setUpdatingLabour] = useState({
        id: '',
        name: '',
        contactNo: '',
        email: '',
        address: '',
        skills: '',
        location: ''
    });

    useEffect(async () => {
        await getAllLabours(labourDispatch);
    }, []);

    useEffect(() => {
        console.log(labourState);
    }, [labourState]);

    const handleChange = (e) => {
        setUpdatingLabour({
            ...updatingLabour,
            [e.target.name]: e.target.value,
        });
    };

    const onEditClick = (labour) => {
        setUpdateModalShow(true);
        setUpdatingLabour({
            ...labour,
        });
    }

    const handleLabourUpdate = async (e) => {
        e.preventDefault();
        setIsUpdateLoading(true);
        console.log(updatingLabour.skills);
        await updateLabour({
            ...updatingLabour,
            skills: updatingLabour.skills.split(",").map(e => e.trim())
        });
        setIsUpdateLoading(false);
        setUpdateModalShow(false);
    }

    const onDeleteClick = (labour) => {
        setDeletingLabour(labour);
        setDeleteModalShow(true);
    }

    const handleLabourDelete = async (e) => {
        setIsDeleteLoading(true);
        await deleteLabour(deletingLabour.id);
        setIsDeleteLoading(false);
        setDeleteModalShow(false);
    }

    const handleAssignClicked = async (e, labour) => {
        setjobList([]);
        setselectedLabour(labour)
        if (companyList.companyList.length == 0)
            await getAllCompanies(companyDispatch);
        setAssignModalShow(true);
    }

    const handleCompanySelect = async (e) => {
        let selectedCMP = companyList.companyList.filter(item => item.id == e.target.value);
        setSelectedCompany(selectedCMP)
        let requestList = await getjobRequests(selectedCMP);
        setjobList(requestList);
    }

    const handleJobSelect = (e) => {
        let selectedJOB = jobList.filter(item => item.id == e.target.value);
        setselectedJob(selectedJOB);
    }

    const handleJobAssign = async (e) => {
        e.preventDefault();
        setassignLoading(true);
        if (selectedCompany != null && selectedJob != null) {
            await assignALabour(selectedCompany[0].id, selectedJob[0].id, selectedLabour);
        }
        setassignLoading(false);
        setAssignModalShow(false);
    }

    return (
        <div>
            <Modal show={deleteModalShow} closeButton onHide={() => setDeleteModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Alert variant={'light'}><b>UID:</b>{` ${deletingLabour.id}`}</Alert>
                    <Alert variant={'light'}><b>Name:</b>{` ${deletingLabour.name}`}</Alert>
                    {isDeleteLoading &&
                        <div class="spinner-border text-primary" role="status"></div>
                    }
                    {!isDeleteLoading &&
                        <Button variant="danger" type="submit" onClick={handleLabourDelete}>
                            Confirm {` & `} Delete
                        </Button>
                    }
                </ModalBody>
            </Modal>

            <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Labour</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form className="p-2" style={{ backgroundColor: '#ffffff' }} onSubmit={handleLabourUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter name"
                                value={updatingLabour.name}
                                onChange={handleChange}
                                name="name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter contact No"
                                value={updatingLabour.contactNo}
                                onChange={handleChange}
                                name="contactNo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="email" placeholder="Enter email"
                                value={updatingLabour.email}
                                onChange={handleChange}
                                name="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter address"
                                value={updatingLabour.address}
                                onChange={handleChange}
                                name="address" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Labour Skills</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Labour Skills"
                                value={updatingLabour.skills}
                                onChange={handleChange}
                                name="skills" />
                        </Form.Group>

                        {isUpdateLoading &&
                            <div class="spinner-border text-primary" role="status"></div>
                        }
                        {!isUpdateLoading &&
                            <Button variant="primary" type="submit">
                                Update Labour
                            </Button>
                        }
                    </Form>
                </ModalBody>
            </Modal>

            <Modal show={assignModalShow} closeButton onHide={() => setAssignModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Labour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-4" style={{ backgroundColor: '#ffffff' }}>
                        <Form.Label className="mb-3">Name : <span> Kapila Perera</span></Form.Label>
                        <Form.Group className="mb-3" controlId="formLabourName">
                            <Form.Label>Company</Form.Label>
                            <Form.Select onChange={handleCompanySelect}>
                                <option value="" >-- Select a Company --</option>
                                {
                                    companyList.companyList.map(e => (
                                        <option value={e.id} >{e.companyName}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        {jobList.length > 0 &&
                            <Form.Group className="mb-3" controlId="formCompanyEmail">
                                <Form.Label>Job</Form.Label>
                                <Form.Select onChange={handleJobSelect}>
                                    <option value="" >-- Select a Job --</option>
                                    {
                                        jobList.map(e => (
                                            <option value={e.id} >{e.job}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {assignLoading &&
                        <div class="spinner-border text-primary" role="status"></div>
                    }
                    {!assignLoading &&
                        <Button variant="primary" onClick={(e) => handleJobAssign(e)}>
                            Assign
                        </Button>
                    }
                </Modal.Footer>
            </Modal>

            <div className="row mt-4 p-4">
                <div className="col-12 p-4">
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Uid</th>
                                <th>Labour Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Labour Skills</th>
                                <th>Manage Laber</th>
                                <th>Assign to Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                labourState.labourList.length > 0 &&
                                labourState.labourList.map(labour => (
                                    <tr key={labour.id}>
                                        <td>{labour.name}</td>
                                        <td>{labour.email}</td>
                                        <td>{labour.contactNo}</td>
                                        <td>{labour.address}</td>
                                        <td>{labour.skills.map(e => `${e}, `)}</td>
                                        <td></td>
                                        <td>
                                            <button className="btn btn-success"
                                                onClick={() => {
                                                    onEditClick({
                                                        ...labour,
                                                        skills: labour.skills.map(e => ` ${e}`).toString()
                                                    })
                                                }} >Edit</button>
                                            <button className="btn btn-danger" onClick={() => onDeleteClick(labour)} >Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={(e) => handleAssignClicked(e, labour)}>Assign</button>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default LabourListComponent;
