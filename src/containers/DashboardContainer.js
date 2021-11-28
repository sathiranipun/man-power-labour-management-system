import React from 'react'
import { Button, Form, Modal, Card, Row, Col , Stack, Accordion, useAccordionButton } from "react-bootstrap";
import "./DashboardContainer.css";

const DashboardContainer = () => {
    return (
        <div>
            <Stack gap={3} className="pt-4 pb-0">
            <h4 className="pb-3 text-center">Company Management</h4>
            <hr/>
                <Row className="px-4">
                    <Col md >
                        <Card className="job-boarder">
                            <Card.Body>
                                <div>Registered Companies</div>
                                <h2>45</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md >
                        <Card className="labour-boarder">
                            <Card.Body>
                                <div>Registered Labours</div>
                                <h2>100</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="px-4">
                    <Col md >
                        <Card className="job-boarder">
                            <Card.Body>
                                <div>No.of Ongoing Jobs</div>
                                <h2>12</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md >
                        <Card className="labour-boarder">
                            <Card.Body>
                                <div>No.of Assigned Labours</div>
                                <h2>85</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="px-4">
                    <Col md >
                        <Card className="job-boarder">
                            <Card.Body>
                                <div>New Job Requests</div>
                                <h2>05</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md >
                        <Card>
                            <Card.Body className="labour-boarder">
                                <div>No.of Unassigned Labours</div>
                                <h2>85</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Stack>
        </div>
    )
}

export default DashboardContainer
