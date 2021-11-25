import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalBody, Table, Button, Alert } from 'react-bootstrap'


const LabourListComponent = () => {
    const [assignModalShow, setAssignModalShow] = useState(false);
    const handleClose = () => setAssignModalShow(false);
    const handleShow = () => setAssignModalShow(true);

    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    // const [deletingCompany, setDeletingCompany] = useState({});


    const handleChange = (e) => {
        // setUpdatingLabour({
        //     ...updatingLabour,
        //     [e.target.name]: e.target.value,
        // });
    };

    const onEditClick = () => {
        setUpdateModalShow(true);
    }

    const handleLabourUpdate = async (e) => {
        // e.preventDefault();
        setIsUpdateLoading(true);
        // await updateLabour(updatingCompany);
        // setIsUpdateLoading(false);
        // setUpdateModalShow(false);
    }

    const onDeleteClick = () => {
        setDeleteModalShow(true);
    }

    const handleLabourDelete = async (e) => {
        setIsDeleteLoading(true);
        setIsDeleteLoading(false);
        setDeleteModalShow(false);
    }
    return (
        <div>
            <Modal show={deleteModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form.Label className="mb-3 px-4"><b>UId :&nbsp;</b><span> 0133200</span></Form.Label>
                    <Form.Label className="mb-3 px-4"><b>Name :&nbsp;</b><span> Kapila Perera</span></Form.Label>
                    <p className="px-2">Do you really want to delete this record? This process can not be undone.</p>
                    {/* {isDeleteLoading &&
                        <div class="spinner-border text-primary" role="status"></div>
                    } */}
                    {/* {!isDeleteLoading && */}
                    <Button variant="danger" type="submit">
                        Confirm {` & `} Delete
                    </Button>
                    {/* } */}
                </ModalBody>
            </Modal>

            <Modal show={updateModalShow} onHide={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Labour</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form className="p-2" style={{ backgroundColor: '#ffffff' }} >
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Name"
                                value=""
                                onChange=""
                                name="LabourName" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Contact No"
                                value=""
                                onChange=""
                                name="contactNo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter address"
                                value=""
                                onChange=""
                                name="location" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Labour Skills</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Labour Skills"
                                value=""
                                onChange=""
                                name="skills" />
                        </Form.Group>

                        {/* {isUpdateLoading && */}
                        {/* <div class="spinner-border text-primary" role="status"></div> */}
                        {/* } */}
                        {/* {!isUpdateLoading && */}
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        {/* } */}
                    </Form>
                </ModalBody>
            </Modal>

            <Modal show={assignModalShow} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Labour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-4" style={{ backgroundColor: '#ffffff' }}>
                        <Form.Label className="mb-3">Name : <span> Kapila Perera</span></Form.Label>
                        <Form.Group className="mb-3" controlId="formLabourName">
                            <Form.Label>Company</Form.Label>
                            <Form.Select  >
                                <option>Select Company</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCompanyEmail">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="Enter Job " />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Assign
                    </Button>
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
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => { onEditClick() }} >Edit</button>
                                        <button className="btn btn-danger" onClick={() => { onDeleteClick() }}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={handleShow}>Assign</button>
                                    </td>
                                </tr>

                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default LabourListComponent
