import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../shared/cooki";
import { dateToString, timeAgo } from "../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { imageContext } from "../../../App";
import wallet from "../../../assets/images/dashboard/wallet.png";

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
    title: "Active User Balance",
    property: "totalUserBalance",
  },
  {
    title: "Active User Income Balance",
    property: "totalActiveUserBalance",
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
    totalUserBalance: 0,
    totalActiveUserBalance: 0,
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
        }&userType=${filterInput.userType || ""}`,
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
    navigate(`/edit_user/${userID}`);
  };
  const handleSetRank = (userID) => {
    navigate(`/admin/add-ranks/${userID}`);
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
                      {!item.user && <strong>৳</strong>}

                      {balance[item.property]}
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
                <th className="big">Balance</th>
                <th>Shopping Balance</th>
                <th>Status</th>
                <th>Join Date</th>
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
                      {/* <td className="img">
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
                      </td> */}
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
                      <td>{reqInfo?.balance}</td>
                      <td className="big">{reqInfo?.shoppingBalance}</td>
                      <td>{reqInfo?.isActive ? "Active" : "Inactive"}</td>
                      <td className="date">{dateToString(reqInfo.joinDate)}</td>
                      {/* <td className="date">{timeAgo(reqInfo.createdAt)}</td> */}

                      {/* <td className={`btn ${reqInfo.status.toLowerCase()}`}>
                      <button>{reqInfo.status}</button>
                    </td> */}
                      <td className={`btn-container `}>
                        <div>
                          <button
                            onClick={() => handleViewDetails(reqInfo._id)}
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditDetails(reqInfo._id)}
                          >
                            Edit Details
                          </button>
                          <button onClick={() => handleSetRank(reqInfo._id)}>
                            Set Rank
                          </button>
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
