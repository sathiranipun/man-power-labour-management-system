import React, { useEffect, useState } from 'react';
import { Form, Modal, Table, Button } from 'react-bootstrap';
import { getAllCompanies } from '../../services/companyService';
import { useStateValue } from '../../services/ContextProvider';
import { getAllJobRequests } from '../../services/JobRequestService';
import { addNewPayment, getAllPayments, updatePayment } from '../../services/paymentService';

const PaymentComponent = () => {
    const { companyList, companyDispatch } = useStateValue();

    const [jobRequests, setJobRequests] = useState([]);
    const [payments, setPayments] = useState([]);
    const [currentJobRequest, setCurrentJobRequest] = useState(null);
    const [currentPayment, setCurrentPayment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(async () => {
        if (!companyList.companyList) {
            await getAllCompanies(companyDispatch);
        }
    }, []);

    useEffect(() => {
        if (!companyList.jobRequests && companyList.companyList.length) {
            getAllJobRequests(companyDispatch, companyList.companyList);
        }
    }, [companyList.companyList])

    useEffect(async () => {
        setJobRequests(companyList.jobRequests || []);
        if (companyList.jobRequests) {
            await getAllPayments(companyList.jobRequests, setPayments);
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

    const changePaymentType = (value) => {
        const paymentValue = currentPayment[`${currentPayment.paymentType}s`];
        delete currentPayment[`${currentPayment.paymentType}s`];
        setCurrentPayment({
            ...currentPayment,
            paymentType: value,
            [`${value}s`]: paymentValue
        });
    }

    const savePayments = async () => {
        if(currentPayment.id) {
            const { id, ...data } = currentPayment;
            await updatePayment(id, data, payments, setPayments, currentIndex);
        } else {
            await addNewPayment(currentPayment, payments, setPayments, currentIndex);
        }
        setShowModal(false);
    }

    return (
        <div>
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
                        </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => savePayments()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="row mt-4 p-4">
                <div className="col-12 p-4">
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Job</th>
                                <th>Labour count</th>
                                <th>Payment Status</th>
                                <th>Per Labour(Rs.)</th>
                                <th>Company Allocation</th>
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
                                                payments[index] ? '-' : 'Not allocated'
                                            }
                                        </td>
                                        <td>{'-'}</td>
                                        <td>{'-'}</td>
                                        <td>{'-'}</td>
                                        <td>{'-'}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => addPayment(jobRequest, payments[index], index)}>Add Payment</button>
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