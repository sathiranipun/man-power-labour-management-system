import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { getAllCompanies } from '../../services/companyService'
import { useStateValue } from '../../services/ContextProvider'

const CompanyListComponent = () => {

    const { companyList, companyDispatch } = useStateValue();
    useEffect(async () => {
        await getAllCompanies(companyDispatch)
    }, []);

    useEffect(() => {
        console.log(companyList);
    }, [companyList]);

    return (
        <div>
            <div className="row mt-4 p-4">
                <div className="col-12 p-4">
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Uid</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Manage Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companyList.companyList.length > 0 && companyList.companyList.map(company => (
                                    <tr>
                                        <td>{company.id}</td>
                                        <td>{company.companyName}</td>
                                        <td>{company.email}</td>
                                        <td>{company.contactNo}</td>
                                        <td>{company.location}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => { }}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => { }}>Delete</button>
                                        </td>
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

export default CompanyListComponent
