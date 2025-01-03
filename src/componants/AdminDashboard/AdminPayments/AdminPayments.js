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
    title: "Today Approve Payment Request",
    property: "todayApprovePaymentRequest",//done
    user: true,

  },
  {
    title: "Today Pending Payment Request",
    property: "todayPendingPaymentRequest",
    user: true,

  },
  {
    title: "Today Total Payment Request",
    property: "totalTotalPaymentRequest",
    user: true,

  },
  {
    title: "Total Approve Payment Request",
    property: "totalApprovePaymentRequest", 
    user: true,

  },
  {
    title: "Total Pending Payment Request",
    property: "totalPendingPaymentRequest",  
    user: true,

  },
  {
    title: "Total Payment Request",
    property: "totalPaymentRequest", 
    user: true,

  },

  {
    title: "Today Approve Payment Balance",
    property: "todayApprovePaymentBalance",    
  },
  {
    title: "Today Pending Payment Balance",
    property: "todayPendingPaymentBalance",   
  },
  {
    title: "Today Total Payment Balance",
    property: "totalTotalPaymentBalance",   
  },
  {
    title: "Total Approve Payment Balance",
    property: "totalApprovePaymentBalance",  

  },
  {
    title: "Total Pending Payment Balance",
    property: "totalPendingPaymentBalance",   

  },
  {
    title: "Total Payment Balance",
    property: "totalPaymentBalance",  
  },
 
];
const AdminPayments = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState({});
  const { setViewImage } = useContext(imageContext);

  const debounceState = useRef();

  const navigate = useNavigate();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-payments/init-balance`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
         if (data.data) {
          setBalance(data.data)
         }
      })
      .finally(() => {
        setLoading(false);
      });

  }, [])
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/admin-payments?page=${page}`,
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
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-payments/status`, {
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
    navigate("/admin/payments-config");
  };

  return (
    <div className="admin-Payment">
      <div className="btn-container">
        <button onClick={handleConfigNavigation}>Set Config</button>
      </div>
      <div className="common-table-section">
        <h4 className="dashboard-title">ADMIN PAYMENTS HISTORY</h4>
        <div className="balance-section">
          <div className="grid-section">
            {tableBalanceArray.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div className="top">
                    {item.user && <FaUsers/>}
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
                <th className="img">Img</th>
                <th className="big">User Name</th>
                <th>User ID</th>
                <th>Method</th>
                <th>Number</th>
                <th>Transaction Number</th>
                <th>Amount</th>
                <th className="big">Account Balance</th>
                <th>Screen Short</th>
                <th>Ago</th>
                <th>Date</th>
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
                      <td className="img">
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
                      </td>
                      <td>{reqInfo?.userID?.fullName}</td>
                      <td>{reqInfo?.userID?.phoneNumber}</td>
                      <td>{reqInfo?.payments?.paymentMethod}</td>
                      <td>{reqInfo?.payments?.paymentNumber}</td>
                      <td>{reqInfo?.payments?.transitionNumber}</td>
                      <td>৳{reqInfo?.amount}</td>
                      <td>৳{accountBalance}</td>
                      <td className="img big">
                        <img
                          src={getImageUrl(reqInfo?.payments?.img)}
                          alt=""
                          onDoubleClick={() =>
                            setViewImage(getImageUrl(reqInfo?.payments?.img))
                          }
                        />
                      </td>
                      <td className="date">{timeAgo(reqInfo.createdAt)}</td>
                      <td className="date">
                        {dateToString(reqInfo.createdAt)}
                      </td>
                      {/* <td className={`btn ${reqInfo.status.toLowerCase()}`}>
                      <button>{reqInfo.status}</button>
                    </td> */}
                      <td className={`status ${reqInfo?.status}`}>
                        <div>
                          <p>{reqInfo?.status}</p>
                        </div>
                      </td>
                      <td
                        className={`btn-container ${reqInfo.status.toLowerCase()}`}
                      >
                        <div>
                          {/* {reqInfo.status !== "Pending" && (
                            <button
                              onClick={() =>
                                handleStatus("Pending", reqInfo._id)
                              }
                              disabled={reqInfo.status === "Cancel"}
                            >
                              Pending
                            </button>
                          )}
                          {reqInfo.status !== "Reject" && (
                            <button
                              className="reject"
                              onClick={() =>
                                handleStatus("Reject", reqInfo._id)
                              }
                              disabled={reqInfo.status === "Cancel"}
                            >
                              Reject{" "}
                            </button>
                          )}
                          {reqInfo.status !== "Approve" && (
                            <button
                              className="approve"
                              onClick={() =>
                                handleStatus("Approve", reqInfo._id)
                              }
                              disabled={reqInfo.status === "Cancel"}
                            >
                              Approve
                            </button>
                          )} */}
                          {reqInfo.status === "Pending" && (
                            <>
                              <button
                                className="approve"
                                onClick={() =>
                                  handleStatus("Approve", reqInfo._id)
                                }
                                disabled={reqInfo.status === "Cancel"}
                              >
                                Approve
                              </button>
                               
                              <button
                                className="reject"
                                onClick={() =>
                                  handleStatus("Reject", reqInfo._id)
                                }
                                disabled={reqInfo.status === "Cancel"}
                              >
                                Reject{" "}
                              </button>
                              <button
                                onClick={() =>
                                  handleStatus("Delete", reqInfo._id)
                                }
                                disabled={reqInfo.status === "Cancel"}
                              >
                                Delete
                              </button>
                            </>
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

export default AdminPayments;
