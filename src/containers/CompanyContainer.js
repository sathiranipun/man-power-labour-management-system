import React from 'react'
import { Button, Nav, Tabs, Tab } from "react-bootstrap";
import AddCompanyComponent from '../components/CompanyComponent/AddCompanyComponent';
import CompanyListComponent from '../components/CompanyComponent/CompanyListComponent';
import JobComponent from '../components/CompanyComponent/JobComponent';


const CompanyContainer = () => {
    return (
        <div>
            <div >
                <h4 className="py-3 text-center">Company Management</h4>
                <Tabs transition={true} defaultActiveKey="first">
                    <Tab eventKey="first" title="Add Company">
                        <AddCompanyComponent />
                    </Tab>
                    <Tab eventKey="second" title="Company List">
                        <CompanyListComponent />
                    </Tab>
                    <Tab eventKey="third" title="Job Requests">
                        <JobComponent />
                    </Tab>
                    <Tab eventKey="fourth" title="Payments">
                        Payments
                    </Tab>
                    <Tab eventKey="fifth" title="Services">
                        Services
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default CompanyContainer
