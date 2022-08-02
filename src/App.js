import { createContext, useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import AboutUs from './componants/AboutUs/AboutUs';
// import Dashboard from './componants/Dashboard/Dashboard';
// import BalanceRequest from './componants/Dashboard/Pages/BalanceRequest/index';
// import BalanceTransfer from './componants/Dashboard/Pages/BalanceTransfer/Index';
// import ChangePassword from './componants/Dashboard/Pages/ChangePassword/Index';
// import Generation from './componants/Dashboard/Pages/Generation/Index';
// import MobileRecharge from './componants/Dashboard/Pages/MobileRecharge/Index';
// import UpdateProfile from './componants/Dashboard/Pages/UpdateProfile/Index';
// import Withdraw from './componants/Dashboard/Pages/Withdraw/Index';
// import Home from './componants/Home/Home';
// import Login from './componants/Login/Login';
// import Registration from './componants/Registration/Registration';
import Routess from './Routese/Routes';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({})

  let useEffectRenderCount = 0;

  useEffect(() => {
    const cooki = document.cookie.split("=")[1];
    useEffectRenderCount = useEffectRenderCount + 1;
    console.log("rander count", useEffectRenderCount)
    if (cooki) {
      fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${cooki}`
        }
      }).then(res => res.json())
        .then(data => {
          setUser(data);
          console.log(data)
        })
    }
  }, []);


  return (
    <div className="App">
      <userContext.Provider value={[user, setUser]}>
        <Routess></Routess>
      </userContext.Provider>
    </div>
  );
}

export default App;
