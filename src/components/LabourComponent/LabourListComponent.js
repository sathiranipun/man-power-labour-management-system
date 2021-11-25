import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalBody, Table, Button, Alert } from 'react-bootstrap'


const LabourListComponent = () => {

    // const [updateModalShow, setUpdateModalShow] = useState(false);
    // const [deleteModalShow, setDeleteModalShow] = useState(false);
    // const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    // const [deletingCompany, setDeletingCompany] = useState({});


    // const handleChange = (e) => {
    //     setUpdatingLabour({
    //         ...updatingLabour,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const onEditClick = () => {
    //     setUpdateModalShow(true);
    //     setUpdatingCompany({
    //         ...company,
    //     })
    // }

    // const handleLabourUpdate = async (e) => {
    //     e.preventDefault();
    //     setIsUpdateLoading(true);
    //     await updateLabour(updatingCompany);
    //     setIsUpdateLoading(false);
    //     setUpdateModalShow(false);
    // }

    // const onDeleteClick = (company) => {
    //     setDeletingCompany(company);
    //     setDeleteModalShow(true);
    // }

    // const handleLabourDelete = async (e) => {
    //     setIsDeleteLoading(true);
    //     await deleteLabour(deletingCompany.id);
    //     setIsDeleteLoading(false);
    //     setDeleteModalShow(false);
    // }
    return (
        <div>
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Labour?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Alert variant={'light'}><b>UID:</b>{}</Alert>
                    <Alert variant={'light'}><b>Name:</b>{}</Alert>
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

            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Labour</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form className="p-2" style={{ backgroundColor: '#ffffff' }} >
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter name"
                                value=""
                                onChange=""
                                name="LabourName" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter contact No"
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
                                Update Labour
                            </Button>
                        {/* } */}
                    </Form>
                </ModalBody>
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
                                            <button className="btn btn-success" >Edit</button>
                                            <button className="btn btn-danger" >Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" >Assign</button>
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
