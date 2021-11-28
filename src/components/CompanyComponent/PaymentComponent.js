import React, { useEffect, useState } from 'react';
import { Form, Modal, Table, Button, Badge } from 'react-bootstrap';
import { getAllCompanies } from '../../services/companyService';
import { useStateValue } from '../../services/ContextProvider';
import { getAllJobRequests } from '../../services/JobRequestService';
import { addNewPayment, deletePayment, getAllPayments, updatePayment } from '../../services/paymentService';

const PaymentComponent = () => {
    const { companyList, companyDispatch } = useStateValue();

    const [jobRequests, setJobRequests] = useState([]);
    const [payments, setPayments] = useState([]);
    const [currentJobRequest, setCurrentJobRequest] = useState(null);
    const [currentPayment, setCurrentPayment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        if (!companyList.companyList) {
            getAllCompanies(companyDispatch);
        }
    }, []);

    useEffect(() => {
        if (!companyList.jobRequests && companyList.companyList.length) {
            getAllJobRequests(companyDispatch, companyList.companyList);
        }
    }, [companyList.companyList])

    useEffect(() => {
        setJobRequests(companyList.jobRequests || []);
        if (companyList.jobRequests) {
            getAllPayments(companyList.jobRequests, setPayments);
        }
    }, [companyList.jobRequests])

    const addPayment = (jobRequest, payment, index) => {
        setCurrentJobRequest(jobRequest);
        if (!payment) {
            payment = {
                companyId: jobRequest.company.id,
                jobId: jobRequest.id,
                paymentType: 'day',
                perLabour: 1000,
                companyCommission: 10,
                days: 1
            };
        }
        setCurrentPayment(payment);
        setCurrentIndex(index);
        setShowModal(true);
    }

    const removePayment = (jobRequest, payment, index) => {
        setCurrentJobRequest(jobRequest);
        setCurrentPayment(payment);
        setCurrentIndex(index);
        setShowDeleteModal(true);
    }

    const changePaymentType = (value) => {
        const paymentValue = currentPayment[`${currentPayment.paymentType}s`];
        delete currentPayment[`${currentPayment.paymentType}s`];
        setCurrentPayment({
            ...currentPayment,
            paymentType: value,
            [`${value}s`]: paymentValue
        });
    }

    const handleSavePayment = async () => {
        if(currentPayment.id) {
            const { id, ...data } = currentPayment;
            await updatePayment(id, data, payments, setPayments, currentIndex);
        } else {
            await addNewPayment(currentPayment, payments, setPayments, currentIndex);
        }
        setShowModal(false);
    }

    const handleDeletePayment = async () => {
        await deletePayment(currentPayment.id, payments, setPayments, currentIndex);
        setShowDeleteModal(false);
    }

    return (
        <div>
            <Modal show={showDeleteModal} closeButton onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                {
                    currentPayment && currentJobRequest && <Modal.Body>
                        <Form.Label className="mb-2 px-4"><b>UId :&nbsp;</b><span>{` ${currentPayment.id}`}</span></Form.Label><br />
                        <Form.Label className="mb-2 px-4"><b>Company :&nbsp;</b><span>{` ${currentJobRequest.company.name}`}</span></Form.Label><br />
                        <Form.Label className="mb-2 px-4"><b>Job :&nbsp;</b><span>{` ${currentJobRequest.job}`}</span></Form.Label><br />
                        <p className="px-2">Do you really want to delete this payment record? This process can not be undone.</p>
                        {
                            isLoading ? (
                                <div class="spinner-border text-primary" role="status"></div>
                            ) : (
                                <Button variant="danger" type="submit" onClick={() => handleDeletePayment()}>
                                    Confirm {` & `} Delete
                                </Button>
                            )
                        }
                    </Modal.Body>
                }
            </Modal>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        currentJobRequest && <Form className="p-4" style={{ backgroundColor: '#ffffff' }}>
                            <Form.Group className="mb-3" controlId="formCompanyName">
                                <Form.Label>Company</Form.Label>
                                <Form.Control value={currentJobRequest.company?.name} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyJob">
                                <Form.Label>Job</Form.Label>
                                <Form.Control type="text" value={currentJobRequest.job} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPaymentType">
                                <Form.Label>Payment type</Form.Label>
                                <Form.Select value={currentPayment.paymentType} onChange={(e) => changePaymentType(e.target.value)}>
                                    {
                                        ['hour', 'day', 'month'].map(e => (
                                            <option value={e} key={e}>Per {e}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPerLabour">
                                <Form.Label>Payment (per labour)</Form.Label>
                                <Form.Control type="number" placeholder="Enter Payment per Labour" value={currentPayment.perLabour || 1000} min={1000} onChange={(e) => setCurrentPayment({ ...currentPayment, perLabour: parseInt(e.target.value) })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyCommissionPerLabour">
                                <Form.Label>Company Commission (per Labour %)</Form.Label>
                                <Form.Control type="number" placeholder="Enter Company Commission per Labour" value={currentPayment.companyCommission || 10}  min={10} onChange={(e) => setCurrentPayment({ ...currentPayment, companyCommission: parseInt(e.target.value) })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyCommissionPerLabour">
                                <Form.Label>Number of {currentPayment.paymentType}s</Form.Label>
                                <Form.Control type="number" placeholder="Enter Company Commission per Labour" value={currentPayment[`${currentPayment.paymentType}s`]}  min={1} onChange={(e) => setCurrentPayment({ ...currentPayment, [`${currentPayment.paymentType}s`]: parseInt(e.target.value) })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCompanyPaid">
                                <Form.Label>Paid amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter the Amount paid" value={currentPayment.paid || 0}  min={0} onChange={(e) => setCurrentPayment({ ...currentPayment, paid: parseInt(e.target.value) })} />
                            </Form.Group>
                        </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {
                        isLoading ? (
                            <div class="spinner-border text-primary" role="status"></div>
                        ) : (
                            <Button variant="primary" onClick={() => handleSavePayment()}>
                                Save Changes
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>

            <div className="row mt-4 p-4">
                <div className="card col-12 p-4">
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Job</th>
                                <th>Labour count</th>
                                <th>Payment Status</th>
                                <th>Payment Type</th>
                                <th>Amount (Rs.)</th>
                                <th>Company Commission</th>
                                <th>Hours/Days/Month count</th>
                                <th>Total amount</th>
                                <th>Paid amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobRequests.map((jobRequest, index) => (
                                    <tr key={`${jobRequest.company.id}-${jobRequest.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{jobRequest.company.name}</td>
                                        <td>{jobRequest.job}</td>
                                        <td>{jobRequest.labourCount}</td>
                                        <td>
                                            {
                                                payments[index] ? (
                                                    payments[index].perLabour * (1 + payments[index].companyCommission/100) * jobRequest.labourCount * payments[index][`${payments[index].paymentType}s`] <= payments[index].paid ? 
                                                    <Badge bg="success" pill>Completed</Badge> : <Badge bg="danger" pill>To be paid</Badge>
                                                ) : <Badge bg="warning" pill text="dark">Not allocated</Badge>
                                            }
                                        </td>
                                        <td>{payments[index] ? `Per ${payments[index].paymentType}` : '-'}</td>
                                        <td>{payments[index] ? payments[index].perLabour : '-'}</td>
                                        <td>{payments[index] ? payments[index].companyCommission + '%' : '-'}</td>
                                        <td>{payments[index] ? payments[index][`${payments[index].paymentType}s`] : '-'}</td>
                                        <td>{payments[index] ? (
                                            payments[index].perLabour * (1 + payments[index].companyCommission/100) * jobRequest.labourCount * payments[index][`${payments[index].paymentType}s`]
                                        ) : '-'}</td>
                                        <td>{payments[index] ? (payments[index].paid || 0) : '-'}</td>
                                        <td>
                                            <Button size="sm" variant="primary" className="m-1" onClick={() => addPayment(jobRequest, payments[index], index)}>
                                                {
                                                    payments[index] ? 'Edit' : 'Add'
                                                }
                                            </Button>
                                            <Button size="sm" variant="danger" className="m-1" disabled={!payments[index]} onClick={() => removePayment(jobRequest, payments[index], index)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;