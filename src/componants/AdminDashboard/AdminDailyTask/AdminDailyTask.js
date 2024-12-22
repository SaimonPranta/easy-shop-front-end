import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { dateToDateString } from "../../../shared/functions/formateDate";
import { MdArrowBackIos } from "react-icons/md";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import { ToastContainer } from "react-toastify";
import { getCooki } from "../../../shared/cooki";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import { imageContext } from "../../../App";
import { dateToString } from "../../../shared/functions/dateConverter";

const cookie = getCooki();

const tableBalanceArray = [
  {
    title: "Today User Work",
    property: "todayUserWork",
    user: true,
  },
];
const AdminDailyTask = () => {
  const [userList, setUserList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectTask, setSelectTask] = useState({});
  const [user, setUser] = useState({});
  const [todayPoint, setTodayPoint] = useState(0);
  const { setViewImage } = useContext(imageContext);
  const [filterInput, setFilterInput] = useState({
    submitSearch: false
  });
  const [balance, setBalance] = useState({
    todayUserWork: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/admin-get-task?userID=${user._id}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log("data =>>", data);
        if (data.data) {
          setTaskList(data.data);
        }
        if (data.todayPoint) {
          setTodayPoint(data.todayPoint);
        }
      });
  }, [user._id]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/admin-user-list`, {
      method: "POST",
      body: JSON.stringify(filterInput),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        authorization: `Bearer ${cookie}`
    }
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data 66666=>>", data);
        if (data.data) {
          setUserList(data.data);
        }
        if (data.todayUserWork) {
          setBalance({
            todayUserWork: data.todayUserWork
          });
        }
      });
  }, [filterInput.submitSearch]);
  const handleGoToLink = (link) => {
    window.open(link, "_blank");
  };
  const handleTaskApprove = (taskID) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/task-approve`, {
      method: "POST",
      body: JSON.stringify({
        name: `${user.firstName} ${user.lastName}`,
        taskID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data =>>", data);
        if (data.data) {
          setTaskList((state) => {
            state = state.map((info) => {
              if (info._id === data.data._id) {
                return { ...data.data };
              }

              return info;
            });
            return [...state];
          });
          setSelectTask({});
        }
        if (data.message) {
          SuccessTost(data.message);
        }
      });
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilterInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return (
  <div className="admin-daily-task">
      <div className="add-task-button">
        <button
          onClick={() => {
            navigate("/admin/add-daily-task");
          }}
        >
          Add Task
        </button>
      </div>

      {!user._id && (
        <>
          <div className="common-table-section">
            <div className="balance-section">
              <div className="grid-section">
                {tableBalanceArray.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="top">
                        {item.user && <FaUsers />}
                        <strong>{item.title}</strong>
                        <p>
                          {!item.user && !item.point && <strong>৳</strong>}

                          {balance[item.property]
                            ?.toFixed(2)
                            ?.replace(".00", "")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="filter-section">
          <div className="input-section">
            <div className="date">
              <span>From</span>
              <input
                type="date"
                name="fromDate"
                value={filterInput.fromDate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="date">
              <span>To</span>
              <input
                type="date"
                name="toDate"
                value={filterInput.toDate || ""}
                onChange={handleInputChange}
              />
            </div> 
            <input
              type="text"
              placeholder="Search here ..."
              name="search"
              value={filterInput.search || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="submit-section">
            <button onClick={() => {
              setFilterInput((state) => {
                return {
                  ...state,
                  submitSearch: !state.submitSearch
                }
              }) 
            }}>Filter</button>
          </div>
        </div>
          </div>
          <div className="daily-task-list-section">
            <dvi className="daily-task-table">
              <table>
                <thead>
                  <tr>
                    <th className="auto">#</th>
                    <th className="ext-big">Date</th>
                    <th className="big">Name</th>
                    <th className="big">Account Number</th>
                    <th className="big">Total Point</th>
                    <th className="big">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((task, index) => {
                    console.log("task ----->>>", task);
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{dateToString(task?.createdAt)}</td>
                        <td className="user-profile">
                          <div className="">
                            {task?.userID?.profilePicture && (
                              <img
                                alt=""
                                src={getImageUrl(task?.userID?.profilePicture)}
                                onDoubleClick={() =>
                                  setViewImage(
                                    getImageUrl(task?.userID?.profilePicture)
                                  )
                                }
                              />
                            )}
                            {!task?.userID?.profilePicture && (
                              <FaRegUserCircle />
                            )}

                            <h4>{`${task?.userID?.firstName} ${task?.userID?.lastName}`}</h4>
                          </div>
                        </td>
                        <td>{task?.userID?.phoneNumber}</td>
                        <td>{task?.userID?.pointAmount}</td>
                        <td className="action-btn">
                          <button onClick={() => setUser(task?.userID)}>
                            View History
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </dvi>
          </div>
        </>
      )}

      {user._id && (
        <>
          <div className="daily-task-list-section">
            <dvi className="daily-task-table">
              <div className="title-section">
                <button onClick={() => setUser({})}>
                  <MdArrowBackIos />
                  Back
                </button>
                <h4>
                  {`${user.firstName} ${user.lastName}'s Daily Task History`}
                </h4>
              </div>
              <div>
                <h6>{`Today's Earning Point: ${todayPoint}`}</h6>
              </div>
              <table>
                <thead>
                  <tr>
                    <th className="auto">#</th>
                    <th>Date</th>
                    <th className="big">Name</th>
                    <th className="big">Account Number</th>
                    <th className="auto">Total Point</th>
                    <th className="auto">Status</th>
                    <th className="big">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((task, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{dateToDateString(task?.createdAt)}</td>
                        <td className="user-profile">
                          <div className="">
                            <img
                              src={getImageUrl(task?.dailyTaskID?.img)}
                              alt=""
                              onDoubleClick={() =>
                                setViewImage(
                                  getImageUrl(task?.dailyTaskID?.img)
                                )
                              }
                            />
                            <h4>{task?.dailyTaskID?.description}</h4>
                          </div>
                        </td>
                        <td>{user?.phoneNumber}</td>
                        <td>{user?.pointAmount}</td>
                        <td>{task?.completed ? "Approved" : "Not Approved"}</td>
                        <td className="action-btn">
                          <button onClick={() => setSelectTask(task)}>
                            View Documents
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </dvi>
          </div>
        </>
      )}
      {selectTask._id && (
        <div className="document-modal">
          <div className="main-modal">
            <div className="title-section">
              <h6>Show Documents</h6>
            </div>
            <div className="image-grid">
              {selectTask?.images.map((img, index) => {
                return (
                  <div key={index} className="list-item">
                    <img
                      src={getImageUrl(img)}
                      alt=" "
                      onDoubleClick={() => setViewImage(getImageUrl(img))}
                    />
                  </div>
                );
              })}
            </div>
            <div className="action-btn">
              <button onClick={() => setSelectTask({})}>Cancel</button>
              <button
                onClick={() => handleTaskApprove(selectTask._id)}
                disabled={selectTask.completed ? true : false}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminDailyTask;
