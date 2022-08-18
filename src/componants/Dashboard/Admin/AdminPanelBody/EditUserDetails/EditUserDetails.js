
import React, { useEffect, useState } from 'react';
import './EditUserDetails.css';
import { useParams } from 'react-router-dom';
import DashboardMenu from '../../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../../../Pages/DashboardHeader/DashboardHeader';
import inputHandler from '../../../../../Functions/inputHandler';

const EditUserDetails = () => {
  const [currentUsr, setCurrentUsr] = useState({})
  const [message, setMessage] = useState({})
  const { id } = useParams()
  const [updateUser, setUpdateUser] = useState({
    _id: id
  })
  const cooki = document.cookie.split("=")[1];

  useEffect(() => {
    if (cooki) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/userDetails?id=${id}`, {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${cooki}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data.failed) {
          } else {
            data.password = null
            setCurrentUsr(data);
          }
        })
    }
  }, []);

  const fromInputHandler = (e) => {
    inputHandler(e, currentUsr, setCurrentUsr)
    inputHandler(e, updateUser, setUpdateUser)
  }

  const handleFromSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/update_user`, {
      method: "POST",
      body: JSON.stringify(updateUser),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        authorization: `Bearer ${cooki}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message.sucess) {
          setMessage({ sucess: data.message.sucess })
        }
        if (data.message.failed) {
          setMessage({ failed: data.message.failed })
        }
        if (data.data) {
          data.data.password = null;
          setCurrentUsr(data.data)
        }
        setTimeout(() => {
          setMessage({})
        }, 7000);
      })

  }

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
              <form onSubmit={handleFromSubmit}>
                <ul>
                  <li>First Name:<span> <input type="text" name="firstName" value={currentUsr.firstName ? currentUsr.firstName : ""} onChange={fromInputHandler} /> </span></li>
                  <li>Last Name:<span> <input type="text" name="lastName" value={currentUsr.lastName ? currentUsr.lastName : ""} onChange={fromInputHandler} /> </span></li>
                  <li>Balance:<span> <input type="text" name="balance" value={currentUsr.balance ? currentUsr.balance : ""} onChange={fromInputHandler} /> </span></li>
                  <li>Shopping Balance:<span><input type="text" name="shoppingBalance" value={currentUsr.shoppingBalance ? currentUsr.shoppingBalance : ""} onChange={fromInputHandler} /> </span></li>
                  <li>Rank:<span> <input type="text" name="rank" value={currentUsr.rank ? currentUsr.rank : ""} /></span></li>
                  <li>Password:<span> <input type="password" name="password" value={currentUsr.password ? currentUsr.password : ""} onChange={fromInputHandler} /> </span></li>
                 
                  <li> <input type="submit" className="btn btn-primary btn-md m-auto" value="Submit" /></li>
                </ul>
                <div className='resposeContainer'>
                  {
                    !message.failed && message.sucess && <p className='sucess'>{message.sucess}</p>
                  }
                  {
                    !message.sucess && message.failed && <p className='warning'>{message.failed}</p>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;