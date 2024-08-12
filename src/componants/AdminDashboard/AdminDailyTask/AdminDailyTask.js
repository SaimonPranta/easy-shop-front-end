import React, { useEffect, useState } from 'react';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import { dateToDateString } from '../../../shared/functions/formateDate';
import { MdArrowBackIos } from "react-icons/md";

const AdminDailyTask = () => {
  const [userList, setUserList] = useState([])
  const [taskList, setTaskList] = useState([])
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      return
    }
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/admin-get-task?userID=${user._id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("data =>>", data)
        if (data.data) {
          setTaskList(data.data)
        }
      })
  }, [user._id])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/admin-user-list`)
      .then((data) => data.json())
      .then((data) => {
        console.log("data =>>", data)
        if (data.data) {
          setUserList(data.data)
        }
      })
  }, [])
  const handleGoToLink = (link) => {
    window.open(link, "_blank")
  }

  return (
    <div className='admin-daily-task'>
      <div className='add-task-button'>
        <button onClick={() => {
          navigate("/admin/add-daily-task")
        }}>Add Task</button>
      </div>
      {!user._id && <div className='daily-task-list-section'>
        <dvi className="daily-task-table">
          <table>
            <thead>
              <tr>
                <th className='auto'>#</th>
                <th>Date</th>
                <th className='big'>Name</th>
                <th className='big'>Account Number</th>
                <th className='auto'>Total Point</th>
                <th className='big'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                userList.map((task, index) => {
                  return <tr>
                    <td>{index + 1}</td>
                    <td>{dateToDateString(task?.createdAt)}</td>
                    <td className='user-profile'>
                      <div className=''>
                        <img alt='' src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' />
                        <h4>{`${task?.userID?.firstName} ${task?.userID?.lastName}`}</h4>
                      </div>
                    </td>
                    <td>{task?.userID?.phoneNumber}</td>
                    <td>{task?.userID?.pointAmount}</td>
                    <td className='action-btn'>
                      <button onClick={() => setUser(task?.userID)}>
                        View History
                      </button>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </dvi>

      </div>}

      {user._id && <>

        <div className='daily-task-list-section'>
          <dvi className="daily-task-table">
            <div className='title-section'>
              <button onClick={() => setUser({})}>
                <MdArrowBackIos />
                Back
              </button>
              <h4>
                {
                  `${user.firstName} ${user.lastName}'s Daily Task History`
                }
              </h4>
            </div>
            <table>
              <thead>
                <tr>
                  <th className='auto'>#</th>
                  <th>Date</th>
                  <th className='big'>Name</th>
                  <th className='big'>Account Number</th>
                  <th className='auto'>Point</th>
                  <th className='auto'>Total Point</th>
                  <th className='big'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  taskList.map((task, index) => {
                    return <tr>
                      <td>{index + 1}</td>
                      <td>{dateToDateString(task?.createdAt)}</td>
                      <td className='user-profile'>
                        <div className=''>
                          <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${task?.dailyTaskID?.img}`} alt='' />
                          <h4>{task?.dailyTaskID?.description}</h4>
                        </div>
                      </td>
                      <td>{user?.phoneNumber}</td>
                      <td>{task?.dailyTaskID?.pointAmount}</td>

                      <td>{user?.pointAmount}</td>
                      <td className='action-btn'>
                        <button>
                          View History
                        </button>
                      </td>
                    </tr>
                  })
                }

              </tbody>
            </table>
          </dvi>

        </div>
      </>}
    </div>
  );
};

export default AdminDailyTask;