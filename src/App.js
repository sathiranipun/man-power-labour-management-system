import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getApps, getApp, initializeApp } from "firebase/app";
import "./App.css";
import firebaseConfig from "./constants/firebaseConfig";
import Header from "./components/Header";
import CompanyContainer from "./containers/CompanyContainer";
import DashboardContainer from "./containers/DashboardContainer";
import LabourContainer from "./containers/LabourContainer";
import LoginContainer from "./containers/LoginContainer";
import Sidenavbar from "./components/Sidenavbar";

const App = () => {
  useEffect(() => (getApps().length ? getApp() : initializeApp(firebaseConfig)), []);

  return (
    <div className="App">
      {/* <Header /> */}
      <Sidenavbar/>
      <Routes>
        <Route path="/" element={<DashboardContainer />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="company" element={<CompanyContainer />} />
        <Route path="labour" element={<LabourContainer />} />
      </Routes>
    </div>
  );
};

export default App;
