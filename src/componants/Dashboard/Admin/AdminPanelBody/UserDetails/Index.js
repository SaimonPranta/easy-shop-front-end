import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardMenu from '../../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../../../Pages/DashboardHeader/DashboardHeader';
import UserDetails from './UserDetails';

const Index = () => {
  const [currentUsr, setCurrentUsr] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const cooki = document.cookie.split("=")[1];
    if (cooki) {
      fetch(`http://localhost:8000/user/userDetails?id=${id}`, {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${cooki}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data.failed) {
            console.log(data.failed)
          } else {
            setCurrentUsr(data);
          }
        })
    }
  }, []);

  return (
    <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
      <DashboardHeader />
      <div className='dashboard-container'>
        <div className='dashboard-menu'>
          <DashboardMenu />
        </div>
        <div>
          {
            currentUsr._id && <UserDetails currentUsr={currentUsr} />
          }
        </div>
      </div>
    </div>
  );
};

export default Index;