import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AboutUs from './componants/AboutUs/AboutUs';
import Dashboard from './componants/Dashboard/Dashboard';
import BalanceRequest from './componants/Dashboard/Pages/BalanceRequest/index';
import BalanceTransfer from './componants/Dashboard/Pages/BalanceTransfer/Index';
import ChangePassword from './componants/Dashboard/Pages/ChangePassword/Index';
import Generation from './componants/Dashboard/Pages/Generation/Index';
import MobileRecharge from './componants/Dashboard/Pages/MobileRecharge/Index';
import UpdateProfile from './componants/Dashboard/Pages/UpdateProfile/Index';
import Withdraw from './componants/Dashboard/Pages/Withdraw/Index';
import Home from './componants/Home/Home';
import Login from './componants/Login/Login';
import Registration from './componants/Registration/Registration';


function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about_us" element={<AboutUs />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/generation" element={<Generation />}></Route>
          <Route path="balance_request" element={<BalanceRequest />}></Route>
          <Route path="/balance_transfer" element={<BalanceTransfer />}></Route>
          <Route path="/mobile_recharge" element={<MobileRecharge />}></Route>
          <Route path="/withdraw" element={<Withdraw />}></Route>
          <Route path="/porfile/change_password" element={<ChangePassword />}></Route>
          <Route path="/porfile/update_profile" element={<UpdateProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
