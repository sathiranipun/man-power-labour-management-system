import React from 'react'
import { Button, Form, Modal, Card, Row, Col , Stack, Accordion, useAccordionButton } from "react-bootstrap";

const DashboardContainer = () => {
    return (
        <div>
            <Stack gap={3} className="pt-4 pb-0">
            <h4 className="pb-3 text-center">Company Management</h4>
            <hr/>
                <Row className="px-4">
                    <Col md >
                        <Card >
                            <Card.Body>
                                <div>Registered Companies</div>
                                <h2>12</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md >
                        <Card>
                            <Card.Body>
                                <div>Registered Users</div>
                                <h2>100</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="px-4">
                    <Col md >
                        <Card >
                            <Card.Body>
                                <div>No.of Ongoing Jobs</div>
                                <h2>12</h2>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md >
                        <Card>
                            <Card.Body>
                                <div>No.of Assigned Users</div>
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
