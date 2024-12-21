import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../shared/cooki";
import { dateToString, timeAgo } from "../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { imageContext } from "../../../App";
import wallet from "../../../assets/images/dashboard/wallet.png";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";

const tableBalanceArray = [
  {
    title: "Total User",
    property: "total",
    user: true,
  },
  {
    title: "Total Active User",
    property: "activeUser",
    user: true,
  },
  {
    title: "Total Inactive User",
    property: "unactiveUser",
    user: true,
  },
  {
    title: "Blue Tick User",
    property: "blueTickUser",
    user: true,
  },
  {
    title: "Main Balance",
    property: "totalUserBalance",
  },
  {
    title: "Task Balance",
    property: "taskBalance",
  },
  {
    title: "Sales Balance",
    property: "salesBalance",
  },
  {
    title: "Point Balance",
    property: "pointBalance",
    point: true,

  },
  {
    title: "Total Income Main Balance",
    property: "mainBalanceIncome",
  },
  {
    title: "Total Income Task Balance",
    property: "taskBalanceIncome",
  },
  {
    title: "Total Income Points",
    property: "pointIncome",
    point: true,

  },
];
const AdminDailyTask = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [balance, setBalance] = useState({
    total: 0,
    activeUser: 0,
    unactiveUser: 0,
    blueTickUser: 0,
    totalUserBalance: 0,
    taskBalance: 0,
    salesBalance: 0,
    pointBalance: 0,
    mainBalanceIncome: 0,
    taskBalanceIncome: 0, 
    pointIncome: 0, 
  });
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const debounceState = useRef();
  const { setViewImage } = useContext(imageContext);

  const navigate = useNavigate();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${
          process.env.REACT_APP_SERVER_HOST_URL
        }/admin-profile/all-user?page=${page}&search=${
          filterInput.search || ""
        }&fromDate=${filterInput.fromDate || ""}&toDate=${
          filterInput.toDate || ""
        }&userType=${filterInput.userType || ""}&blueTick=${
          filterInput.blueTick
        }`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            if (page === 1) {
              setTableItems((state) => {
                return [...data.data];
              });
            } else {
              setTableItems((state) => {
                return [...state, ...data.data];
              });
            }
          } else {
            setTableItems([]);
          }
          if (data.page) {
            setCurrentPage(Number(data.page - 1));
          }
          if (data.total) {
            setTotal(data.total);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [page, filterInput.searchSubmit]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/user-count`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.count);
      });
  }, []);

  const handleScroll = () => {
    if (loading) {
      return;
    }
    if (total && total <= tableItems.length) {
      return;
    }
    const container = document.getElementById("table-list");
    const scrollTop = container?.scrollTop || 0;
    const offsetHeight = container?.offsetHeight || 0;
    const scrollHeight = container?.scrollHeight || 0;

    if (scrollHeight <= Number(scrollTop + offsetHeight) + 1) {
      if (currentPage === page - 1) {
        setPage((state) => state + 1);
        setLoading(true);
      }
    }
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

  const handleFilterSubmit = () => {
    setPage(1);
    setFilterInput((state) => {
      return {
        ...state,
        searchSubmit: !state?.searchSubmit,
      };
    });
  };

  const handleViewDetails = (userID) => {
    navigate(`/user/${userID}`);
  };
  const handleEditDetails = (userID) => {
    navigate(`/admin/user/edit/${userID}`);
  };
  const handleSetRank = (userID) => {
    navigate(`/admin/add-ranks/${userID}`);
  };
  const handleAddBlueTick = (userID, status) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-profile/blue-tick`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ userID, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const updateList = tableItems.map((user) => {
            if (user._id === userID) {
              if (status === "add") {
                SuccessTost("Blue Tick added successfully");
                user["blueTickInfo"] = {
                  blurTick: true,
                  date: new Date(),
                };
              } else {
                SuccessTost("Blue Tick remove successfully");
                user["blueTickInfo"] = {
                  blurTick: false,
                };
              }
            }

            return { ...user };
          });
          setTableItems((state) => {
            return [...updateList];
          });
        } else {
          FailedTost("Failed to update blue tick");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="admin-user">
      <div className="common-table-section">
        <h4 className="dashboard-title">ADMIN USER</h4>
        <div className="balance-section">
          <div className="grid-section">
            {tableBalanceArray.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div className="top">
                    {item.user && <FaUsers />}
                    {!item.user && <img src={wallet} alt="" />}
                    <strong>{item.title}</strong>
                    <p>
                      {(!item.user && !item.point) && <strong>৳</strong>}

                      {balance[item.property]?.toFixed(2)?.replace(".00", "")}
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
            <select name="userType" onChange={handleInputChange}>
              <option hidden>Select User</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select name="blueTick" onChange={handleInputChange}>
              <option hidden>Select Blue Tick</option>
              <option>Blue Tick User</option>
              <option>Unblue Tick User</option>
            </select>
            <input
              type="text"
              placeholder="Search here ..."
              name="search"
              value={filterInput.search || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="submit-section">
            <button onClick={handleFilterSubmit}>Filter</button>
          </div>
        </div>
        <div className="table-section" id="table-list" onScroll={handleScroll}>
          <table>
            <thead>
              <tr>
                <th className="small">#</th>
                <th className="big"> Name</th>
                <th>User Number</th>
                <th className="big">Upline User Number</th>
                <th className="big">Main Balance</th>
                <th className="big">Sales Balance</th>
                <th className="big">Task Balance</th>
                <th className="big">Points</th>
                <th>Blue Tick</th>
                <th className="big">Blue Tick Added Date</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableItems?.length > 0 &&
                tableItems.map((reqInfo, index) => {
                  let accountBalance = 0;
                  if (reqInfo.balanceType === "Main Balance") {
                    accountBalance = reqInfo?.userID?.balance || 0;
                  } else if (reqInfo.balanceType === "Sales Balance") {
                    accountBalance = reqInfo?.userID?.salesBalance || 0;
                  } else if (reqInfo.balanceType === "Task Balance") {
                    accountBalance = reqInfo?.userID?.taskBalance || 0;
                  }
                  return (
                    <tr key={index}>
                      <td className="small">{index + 1}</td>
                      <td className="img-name">
                        <div>
                          {reqInfo?.userID?.profilePicture && (
                            <img
                              src={getImageUrl(reqInfo?.userID?.profilePicture)}
                              alt=""
                              onDoubleClick={() =>
                                setViewImage(
                                  getImageUrl(reqInfo?.userID?.profilePicture)
                                )
                              }
                            />
                          )}
                          {!reqInfo?.userID?.profilePicture && (
                            <FaRegUserCircle />
                          )}
                          <p>{`${reqInfo?.firstName} ${reqInfo?.lastName}`}</p>
                        </div>
                      </td>
                      <td>{reqInfo?.phoneNumber}</td>
                      <td>{reqInfo?.referUser?.phoneNumber || ""}</td>
                      <td className="big">{`$${reqInfo?.balance || 0}`}</td>
                      <td className="big">{`$${
                        reqInfo?.salesBalance || 0
                      }`}</td>
                      <td className="big">{`$${reqInfo?.taskBalance || 0}`}</td>
                      <td className="big">{reqInfo?.pointAmount || 0}</td>
                      <td>{reqInfo?.blueTickInfo?.date ? "Yes" : "No"}</td>
                      <td className="date">
                        {reqInfo?.blueTickInfo?.date &&
                          dateToString(reqInfo?.blueTickInfo?.date)}
                      </td>
                      <td className="date">{dateToString(reqInfo.joinDate)}</td>
                      <td>{reqInfo?.isActive ? "Active" : "Inactive"}</td>
                      {/* <td className="date">{timeAgo(reqInfo.createdAt)}</td> */}

                      {/* <td className={`btn ${reqInfo.status.toLowerCase()}`}>
                      <button>{reqInfo.status}</button>
                    </td> */}
                      <td className={`btn-container `}>
                        <div>
                          {/* <button
                            onClick={() => handleViewDetails(reqInfo._id)}
                          >
                            View Details
                          </button> */}
                          <button
                            onClick={() => handleEditDetails(reqInfo._id)}
                          >
                            Edit Details
                          </button>
                          <button onClick={() => handleSetRank(reqInfo._id)}>
                            Set Rank
                          </button>
                          {reqInfo?.blueTickInfo?.blurTick && (
                            <button
                              onClick={() =>
                                handleAddBlueTick(reqInfo._id, "remove")
                              }
                            >
                              Remove Blue Tack
                            </button>
                          )}
                          {!reqInfo?.blueTickInfo?.blurTick && (
                            <button
                              onClick={() =>
                                handleAddBlueTick(reqInfo._id, "add")
                              }
                            >
                              Add Blue Tack
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDailyTask;
