import React from 'react'
import { Button, Alert, Card, Row, Col, Stack, Table } from "react-bootstrap";
import "./DashboardContainer.css";

const DashboardContainer = () => {
    return (
        <div>
            <Stack gap={3} className="pt-4 pb-0">
                <h4 className="pb-3 text-center">Company Management</h4>
                <hr />
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
                <hr />
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <Alert variant="primary" className="mx-4 text-center">
                            Click here to generate report
                            <Button className="mx-2">Generate</Button>
                        </Alert>
                    </Col>
                </Row>
                <Row className="justify-content-md-center text-center">
                    <Col xs lg="6">
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Generated Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2021-11-14</td>
                                    <td>MPLMS-21-11-14</td>
                                    <td><Button variant="success" className="mx-2">View</Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2021-10-23</td>
                                    <td>MPLMS-21-10-23</td>
                                    <td><Button variant="success" className="mx-2">View</Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>2021-09-10</td>
                                    <td>MPLMS-21-09-10</td>
                                    <td><Button variant="success" className="mx-2">View</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="px-4">

                </Row>

            </Stack>
        </div>
    )
}

export default DashboardContainer
