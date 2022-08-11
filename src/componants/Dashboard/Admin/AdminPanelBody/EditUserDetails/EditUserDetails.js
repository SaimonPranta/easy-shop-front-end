
import React, { useEffect, useState } from 'react';
import './EditUserDetails.css';
import { useParams } from 'react-router-dom';
import DashboardMenu from '../../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../../../Pages/DashboardHeader/DashboardHeader';

const EditUserDetails = () => {
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
        <div className='m-auto  user-details p-3'>
            <div className="m-auto text-white">
                    <ul>
                        <li>Name:</li>
                        <input value={currentUsr.firstName && `${currentUsr.firstName} ${currentUsr.lastName}`} name=''/>
                        <li>Number:</li>
                        <input value={currentUsr.phoneNumber && currentUsr.phoneNumber} name=''/>
                        <li>Rank:</li>
                        <input value={currentUsr.rank && currentUsr.rank} name=''/>
                        <li>Balance:</li>
                        <input value={currentUsr.balance && currentUsr.balance} name=''/>
                        <li>Shopping Balance:</li>
                        <input value={currentUsr.shoppingBalance && currentUsr.shoppingBalance} name=''/>
                    </ul>
                </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;