import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './componants/Dashboard/Dashboard';
import Generation from './componants/Dashboard/Pages/Generation/Generation';
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
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboard/generation" element={<Generation />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
