import React, { useState, useEffect } from 'react'
import { useStateValue } from "../services/ContextProvider";
import { Form, Button, Table, Modal } from 'react-bootstrap'
import { createUser, getUsers, deleteUser, onUpdateUser } from '../services/UserService'

const UserContainer = () => {
    const { userState, globalDispatch } = useStateValue();
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    })

    const [updateUser, setUpdateUser] = useState({
        name: '',
        email: '',
        isAdmin: false,
        uid: ''
    })

    useEffect(() => {
        getAllUsers();
    }, [])

    const onChangeHandle = (e) => {
        if (e.target.name === 'isAdmin') {
            setNewUser({
                ...newUser,
                [e.target.name]: !newUser.isAdmin
            })
        } else {
            const value = e.target.value;
            setNewUser({
                ...newUser,
                [e.target.name]: value
            })
        }
    }
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(newUser, globalDispatch);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await onUpdateUser(updateUser)
        const updatedUsers = users.map(u => u.uid === updateUser.uid ? { ...updateUser, name: updateUser.name, email: updateUser.email, isAdmin: updateUser.isAdmin } : u);
        setUsers(updatedUsers)
        handleClose()
    };

    const onEdit = async (user) => {
        setShow(true)
        setUpdateUser({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            uid: user.uid
        })
        try {

        } catch (error) {
            console.log(error)
        }
    }

    const onChangeUpdateHandle = (e) => {
        if (e.target.name === 'isAdmin') {
            setUpdateUser({
                ...updateUser,
                [e.target.name]: e.target.checked
            })
        } else {
            const value = e.target.value;
            setUpdateUser({
                ...updateUser,
                [e.target.name]: value
            })
        }
    }

    const getAllUsers = async () => {
        try {
            const users = await getUsers()
            setUsers(users)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-2" style={{ backgroundColor: '#ffffff' }} onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={updateUser.name} name="name" onChange={onChangeUpdateHandle} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={updateUser.email} name="email" onChange={onChangeUpdateHandle} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Is admin?" checked={updateUser.isAdmin} name="isAdmin" onChange={onChangeUpdateHandle} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update User
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h4 className="py-3 text-center">User Management</h4>
            {
                userState.loggedUserData.isAdmin && (
                    <div className="row p-2">
                        <div className="col-12 col-lg-6">
                            <Form className="p-4" onSubmit={handleSubmit}>
                                <h3>Add User</h3>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={newUser.name} name="name" onChange={onChangeHandle} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={newUser.email} name="email" onChange={onChangeHandle} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="passoword" placeholder="Enter password" value={newUser.password} name="password" onChange={onChangeHandle} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Is admin?" checked={newUser.isAdmin} name="isAdmin" onChange={onChangeHandle} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Create User
                                </Button>
                            </Form>
                        </div>
                    </div>
                )
            }

            <div className="row p-4" >
                <div className="card mx-2 col-12 p-4"  >
                    <h3>All Users</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead className="text-center">
                            <tr>
                                <th>Uid</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                                {
                                    userState.loggedUserData.isAdmin && (
                                        <th></th>
                                    )
                                }

                            </tr>
                        </thead>
                        <tbody >
                            {
                                users.length > 0 && users.map(user => (
                                    <tr key={user.uid} >
                                        <td>{user.uid}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin === true ? 'True' : 'False'}</td>
                                        {
                                            userState.loggedUserData.isAdmin && (
                                                <td className="text-center"><button className="btn btn-success mx-1" onClick={() => onEdit(user)}>Edit</button>
                                                <button disabled={user.uid === userState.loggedUserData.uid} className="btn btn-danger" onClick={() => deleteUser(user.uid)}>Delete</button></td>
                                            )
                                        }
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

export default UserContainer
