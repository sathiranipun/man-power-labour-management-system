import React from 'react'
import { Tabs, Tab } from "react-bootstrap";
import AddLabourComponent from '../components/LabourComponent/AddLabourComponent';
import LabourListComponent from '../components/LabourComponent/LabourListComponent';

const LabourContainer = () => {
    return (
        <div>
             <h4 className="py-3 text-center">Labour Management</h4>
                <Tabs transition={true} defaultActiveKey="first">
                    <Tab eventKey="first" title="Add Labour">
                        <AddLabourComponent/>
                    </Tab>
                    <Tab eventKey="second" title="Labour List">
                        <LabourListComponent/>
                    </Tab>
                </Tabs>
        </div>
    )
}

export default LabourContainer
