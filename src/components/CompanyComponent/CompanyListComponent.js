import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalBody, Table, Button, Alert } from 'react-bootstrap'
import { deleteCompany, getAllCompanies, updateCompany } from '../../services/companyService'
import { useStateValue } from '../../services/ContextProvider'

const CompanyListComponent = () => {

    const { companyList, companyDispatch } = useStateValue();
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deletingCompany, setDeletingCompany] = useState({
        companyName: '',
        id: '',
    });
    const [updatingCompany, setUpdatingCompany] = useState({
        id: '',
        companyName: '',
        contactNo: '',
        email: '',
        location: ''
    });


    useEffect(async () => {
        await getAllCompanies(companyDispatch)
    }, []);

    const handleChange = (e) => {
        setUpdatingCompany({
            ...updatingCompany,
            [e.target.name]: e.target.value,
        });
    };

    const onEditClick = (company) => {
        setUpdateModalShow(true);
        setUpdatingCompany({
            ...company,
        })
    }

    const handleCompanyUpdate = async (e) => {
        e.preventDefault();
        setIsUpdateLoading(true);
        await updateCompany(updatingCompany);
        setIsUpdateLoading(false);
        setUpdateModalShow(false);
    }

    const onDeleteClick = (company) => {
        setDeletingCompany(company);
        setDeleteModalShow(true);
    }

    const handleCompanyDelete = async (e) => {
        setIsDeleteLoading(true);
        await deleteCompany(deletingCompany.id);
        setIsDeleteLoading(false);
        setDeleteModalShow(false);
    }
    return (
        <div>
            <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Company?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Alert variant={'light'}><b>UID:</b>{` ${deletingCompany.id}`}</Alert>
                    <Alert variant={'light'}><b>Name:</b>{` ${deletingCompany.companyName}`}</Alert>
                    {isDeleteLoading &&
                        <div class="spinner-border text-primary" role="status"></div>
                    }
                    {!isDeleteLoading &&
                        <Button variant="danger" type="submit" onClick={handleCompanyDelete}>
                            Confirm {` & `} Delete
                        </Button>
                    }
                </ModalBody>
            </Modal>
            <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Company</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form className="p-2" style={{ backgroundColor: '#ffffff' }} onSubmit={handleCompanyUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter name"
                                value={updatingCompany.companyName}
                                onChange={handleChange}
                                name="companyName" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" placeholder="Enter email"
                                value={updatingCompany.email}
                                onChange={handleChange}
                                name="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter contact No"
                                value={updatingCompany.contactNo}
                                onChange={handleChange}
                                name="contactNo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter address"
                                value={updatingCompany.location}
                                onChange={handleChange}
                                name="location" />
                        </Form.Group>
                        {isUpdateLoading &&
                            <div class="spinner-border text-primary" role="status"></div>
                        }
                        {!isUpdateLoading &&
                            <Button variant="primary" type="submit">
                                Update Company
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
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Manage Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companyList.companyList.length > 0 && companyList.companyList.map(company => (
                                    <tr>
                                        <td>{company.id}</td>
                                        <td>{company.companyName}</td>
                                        <td>{company.email}</td>
                                        <td>{company.contactNo}</td>
                                        <td>{company.location}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => { onEditClick(company) }}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => { onDeleteClick(company) }}>Delete</button>
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

export default CompanyListComponent
