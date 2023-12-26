import './App.css';
import {Routes, Route, BrowserRouter,useNavigate} from 'react-router-dom'
import Dashboard from './Components/pages/dashboard'
import Settings from './Components/pages/settings'
import Vesseldetails from './Components/pages/vesseldetails'
import Vessels from './Components/pages/vessels';

import CaptainDetails from "./Components/pages/captainDetails"
import Alerts from "./Components/pages/alerts"
import Notification from "./Components/pages/notification" 
import VesselRegis from "./Components/pages/vesselReg"
import CaptainRegis from "./Components/pages/captainReg"
import Login from "./Components/pages/auth/login"
import VesselEdit from "./Components/pages/editVessel"
import OneVessel from "./Components/pages/oneVessel"

import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) :null
    console.log(token)

  useEffect(() => {


    if (token == null) {
      navigate('/login'); // Navigate to login page if token is not present
    } else {
       navigate('/dashboard');// Navigate to dashboard if token is present
    }
  }, [ token])
  return (
  
    <Routes>
       <Route path='/login' Component={Login}></Route>
      <Route path="/dashboard" Component={Dashboard}></Route>
      <Route path="/settings" Component={Settings}></Route>
      <Route path="/vesseldetails" Component={Vesseldetails}></Route>
      <Route path="/vessels" Component={Vessels}></Route>
      
      <Route path="/captainDetails" Component={CaptainDetails}></Route>
      <Route path='/alerts' Component={Alerts}></Route>
      <Route path='/notification' Component={Notification}></Route>
      <Route path='/vesselReg' Component={VesselRegis}></Route>
      <Route path='/captainReg' Component={CaptainRegis}></Route>
      <Route path='/editVessel/:id' Component={VesselEdit}></Route>
     
      <Route path='/oneVessel/:id' Component={OneVessel}></Route>
      </Routes>
    
  );
}

export default App;
