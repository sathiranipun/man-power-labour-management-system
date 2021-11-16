import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getApps, getApp, initializeApp } from "firebase/app";
import "./App.css";
import firebaseConfig from "./constants/firebaseConfig";
import CompanyContainer from "./containers/CompanyContainer";
import DashboardContainer from "./containers/DashboardContainer";
import LabourContainer from "./containers/LabourContainer";
import LoginContainer from "./containers/LoginContainer";
import Sidenavbar from "./components/Sidenavbar";
import AddJobComponent from "./components/CompanyComponent/AddJobComponent";
import { GuardedRoute } from "./services/GuardedRoute";


const App = () => {
  useEffect(() => (getApps().length ? getApp() : initializeApp(firebaseConfig)), []);

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidenavbar />
        </div>
        <div className="col-md-10 p-0">
          <Routes>
            <Route path="/" exact>
              <GuardedRoute Component={DashboardContainer} />
            </Route>
            <Route path="/company" exact>
              <GuardedRoute Component={CompanyContainer} />
            </Route>
            <Route path="/labour" exact>
              <GuardedRoute Component={LabourContainer} />
            </Route>
            {/* <Route path="/addcompany" exact>
              <GuardedRoute Component={AddJobComponent} />
            </Route> */}
            <Route path="/login" element={<LoginContainer />} />
            {/* <Route path="/company" element={<CompanyContainer />} />
            <Route path="/labour" element={<LabourContainer />} />
            <Route path="/addcompany" element={<AddJobComponent />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
