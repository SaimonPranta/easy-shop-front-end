import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../shared/cooki";
import { dateToString, timeAgo } from "../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { configContext, imageContext } from "../../../App";

const AdminSalary = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [seeMoreID, setSeeMoreID] = useState("");
  const { setViewImage } = useContext(imageContext);
  const [config] = useContext(configContext);

  const debounceState = useRef();

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
        `${process.env.REACT_APP_SERVER_HOST_URL}/admin-salary?page=${page}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
          body: JSON.stringify(filterInput),
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
  const handleStatus = (status, id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-salary/status`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ status, id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          let updateTable = [];
          if (status === "Delete") {
            updateTable = tableItems.filter((item) => {
              if (item._id === id) {
                return false;
              }
              return true;
            });
            SuccessTost("Successfully removed transaction");
          } else {
            SuccessTost(`Transaction status updated to ${status}`);
            updateTable = tableItems.map((item) => {
              if (item._id === id) {
                item.status = data.data?.status;
              }
              return item;
            });
          }
          setTableItems(updateTable);
        } else {
          FailedTost(data.message || "Failed to update user status");
        }
      });
  };

  const handleConfigNavigation = () => {
    navigate("/admin/salary-config");
  };

  return (
    <div className="admin-withdraw">
      <div className="btn-container">
        <button onClick={handleConfigNavigation}>Set Config</button>
      </div>
      <div className="common-table-section">
        <h4 className="dashboard-title">ADMIN SALARY HISTORY</h4>
        <div className="balance-section"></div>
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
            <button onClick={handleFilterSubmit}>Filter</button>
          </div>
        </div>
        <div className="table-section" id="table-list" onScroll={handleScroll}>
          <table>
            <thead>
              <tr>
                <th className="small">#</th>
                <th className="big">User Name</th>
                <th>User ID</th>
                <th>ID</th>
                <th className="big"> Title </th>
                <th className="big">Salary Amount</th>
                <th className="big">Account Balance</th>
                <th>Ago</th>
                <th>Date</th>
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
                          <p> {reqInfo?.userID?.fullName}</p>
                        </div>
                      </td>
                      <td>{reqInfo?.userID?.phoneNumber}</td>
                      <td>{reqInfo?.id}</td>
                      <td className={`big description`}>
                        <div
                          className={`${
                            reqInfo._id === seeMoreID ? "" : "ellipsis"
                          }`}
                          onClick={() => setSeeMoreID(reqInfo._id)}
                        >
                          <p>{config?.salary?.salaryHistoryTitle}</p>
                        </div>
                      </td>
                      <td>৳{reqInfo?.amount}</td>
                      <td>৳{reqInfo?.userID?.balance}</td>
                      <td className="date">{timeAgo(reqInfo.createdAt)}</td>
                      <td className="date">
                        {dateToString(reqInfo.createdAt)}
                      </td>
                      {/* <td className={`btn ${reqInfo.status.toLowerCase()}`}>
                      <button>{reqInfo.status}</button>
                    </td> */}
                      <td
                        className={`btn-container ${reqInfo.status.toLowerCase()}`}
                      >
                        <div>
                          <button
                            onClick={() => handleStatus("Delete", reqInfo._id)}
                            disabled={loading}
                          >
                            Delete
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

export default AdminSalary;
