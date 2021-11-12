import React from 'react'
import {Button,Nav} from "react-bootstrap";
import AddJobComponent from '../components/CompanyComponent/AddJobComponent';


const CompanyContainer = () => {
    return (
        <div>
            <p className="py-3">Company Management</p>
            <Nav justify variant="tabs" defaultActiveKey="addcompany">
                <Nav.Item>
                    <Nav.Link href="addcompany">Add Company</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="edit-company">Edit Company</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cpmany-jobrequests">Job Requests</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="company-payments">Payments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="company-services">Services</Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
                <AddJobComponent/>
            </div>
        </div>
    )
}

export default CompanyContainer
