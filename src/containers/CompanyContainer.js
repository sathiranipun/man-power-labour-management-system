import React from 'react'
import { Button, Nav,Tabs,Tab } from "react-bootstrap";
import AddJobComponent from '../components/CompanyComponent/AddJobComponent';


const CompanyContainer = () => {
    return (
        <div>
            <div >
                <h4 className="py-3 text-center">Company Management</h4>
                <Tabs transition={true} defaultActiveKey="first">
                    <Tab eventKey="first" title="Add Company">
                        <AddJobComponent/>
                    </Tab>
                    <Tab eventKey="second" title="Edit Company">
                    Edit Company
                    </Tab>
                    <Tab eventKey="third" title="Job Requests">
                    Job Requests
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
