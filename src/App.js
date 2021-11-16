import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getApps, getApp, initializeApp } from "firebase/app";
import "./App.css";
import firebaseConfig from "./constants/firebaseConfig";
import CompanyContainer from "./containers/CompanyContainer";
import DashboardContainer from "./containers/DashboardContainer";
import LabourContainer from "./containers/LabourContainer";
// import LoginContainer from "./containers/LoginContainer";
import Sidenavbar from "./components/Sidenavbar";
import LoginComponent from "./components/LoginComponent";
import AddJobComponent from "./components/CompanyComponent/AddJobComponent";


const App = () => {
  useEffect(() => (getApps().length ? getApp() : initializeApp(firebaseConfig)), []);

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginComponent />} />
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidenavbar />
          </div>
          <div className="col-md-10 px-4">
            <Routes>
              <Route path="/" element={<DashboardContainer />} />
              <Route path="company" element={<CompanyContainer />} />
              <Route path="labour" element={<LabourContainer />} />
              <Route path="addcompany" element={<AddJobComponent />} />
            </Routes>
          </div>
        </div>
      </Routes>
    </div>
  );
};

export default App;
