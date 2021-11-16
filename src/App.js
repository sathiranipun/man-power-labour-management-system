import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getApps, getApp, initializeApp } from "firebase/app";
import "./App.css";
import firebaseConfig from "./constants/firebaseConfig";
import CompanyContainer from "./containers/CompanyContainer";
import DashboardContainer from "./containers/DashboardContainer";
import LabourContainer from "./containers/LabourContainer";
import LoginContainer from "./containers/LoginContainer";
import Sidenavbar from "./components/Sidenavbar";
import LoginComponent from "./components/LoginComponent";
import AddJobComponent from "./components/CompanyComponent/AddJobComponent";
import { GuardedRoute } from "./services/GuardedRoute";
import { authStateChangeHandle, login } from "./services/UserService";
import { useStateValue } from "./services/ContextProvider";


const App = () => {
  const location = useLocation();
  const [loginUI, setLoginUI] = useState(false);

  useEffect(() => (getApps().length ? getApp() : initializeApp(firebaseConfig)), []);

  useEffect(() => setLoginUI(location.pathname.includes('login')), [location]);

  //Getting user and globle data
  const { userState, globalDispatch, userDispatch } = useStateValue();

  //Run the auth state listner
  useEffect(async () => {
    await authStateChangeHandle(globalDispatch, userDispatch);
    //await login("nipun299233@gmail.com", 'nipun123');
  }, []);

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <div className="App">
      <div className="row">
        {
          !loginUI && <div className="col-md-2 p-0">
            <Sidenavbar />
          </div>
        }
        <div className="col p-0">
          <Routes>
            <Route path="/" exact element={<GuardedRoute Component={DashboardContainer} />} />
            <Route path="/company" exact element={<GuardedRoute Component={CompanyContainer} />} />
            <Route path="/labour" exact element={<GuardedRoute Component={LabourContainer} />} />
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
