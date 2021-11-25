import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalBody, Table, Button, Alert } from 'react-bootstrap'
import { useStateValue } from '../../services/ContextProvider'
import { getAllLabours, updateLabour } from '../../services/LabourService';


const LabourListComponent = () => {

    const { labourState, labourDispatch } = useStateValue();
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deletingLabour, setDeletingLabour] = useState({
        name: '',
        id: ''
    });

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
                    <Alert variant={'light'}><b>UID:</b>{ }</Alert>
                    <Alert variant={'light'}><b>Name:</b>{ }</Alert>
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
                                            <button className="btn btn-danger" >Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" >Assign</button>
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
