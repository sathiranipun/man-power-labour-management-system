import React from 'react'
import "./Sidenavbar.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Sidenavbar = () => {
    return (
        <div>
            {/* <Header /> */}
            <div className="sidenavbar">
                <h4 className="mb-5">Man Power Labour Management System</h4>

                <li>
                    <Link to="/" >Home</Link>
                </li>
                <li>
                    <Link to="user">Users</Link>
                </li>
                <li>
                    <Link to="company">Company</Link>
                </li>
                <li>
                    <Link to="labour">Labour</Link>
                </li>
            </div>
        </div>
    )
}

export default Sidenavbar;
