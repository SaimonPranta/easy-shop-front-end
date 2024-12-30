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



const AdminProvePost = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeMoreID, setSeeMoreID] = useState("");
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState({});


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
        `${process.env.REACT_APP_SERVER_HOST_URL}/admin-prove?page=${page}`,
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
    console.log("Call scroll", {
      currentPage,
      page,
      currentLength: tableItems.length,
      total,
    });
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
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-prove/status`, {
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
          let updateTable = tableItems.map((item) => {
            if (item._id === id) {
              return data.data;
            }
            return item;
          });

          setTableItems(updateTable);
        } else {
          FailedTost(data.message || "Failed to update user status");
        }
      });
  };

  const handleConfigNavigation = () => {
    navigate("/admin/prove-post-config");
  };

  const handleDelete = (id) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-prove/delete?postID=${id}`,
      {
        method: "DELETE",
        headers: {
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const updateTable = tableItems.filter((item) => item._id !== id);
          setTableItems(updateTable);
        }
      });
  };

  return (
    <div className="admin-withdraw">
      <div className="btn-container">
        <button onClick={handleConfigNavigation}>Set Config</button>
      </div>
      <div className="common-table-section">
        <h4 className="dashboard-title">PROVE POST HISTORY</h4>
      
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
            <select name="postType" onChange={handleInputChange}>
              <option hidden>Select Post</option>
              <option>Enable Post</option>
              <option>Disable Post</option>
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
                <th className="big">User Name</th>
                <th>User ID</th>
                <th>Screen Shorts</th>
                <th className="big"> Description </th>
                <th> Status </th>
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
                      <td className="img">
                        <img
                          src={getImageUrl(reqInfo.images)}
                          onDoubleClick={() => setViewImage(reqInfo.images)}
                          alt=""
                        />
                      </td>
                      <td className={`big description`}>
                        <div
                          className={`${
                            reqInfo._id === seeMoreID ? "" : "ellipsis"
                          }`}
                          onClick={() => setSeeMoreID(reqInfo._id)}
                        >
                          <p>{reqInfo?.description}</p>
                        </div>
                      </td>
                      <p> {reqInfo?.disable ? "Disable" : "Enable"}</p>

                      <td className="date">{timeAgo(reqInfo.createdAt)}</td>
                      <td className="date">
                        {dateToString(reqInfo.createdAt)}
                      </td>
                      <td className={`btn-container  `}>
                        <div>
                          {reqInfo.disable && (
                            <button
                              onClick={() =>
                                handleStatus("Enable", reqInfo._id)
                              }
                              disabled={loading}
                            >
                              Enable
                            </button>
                          )}
                          {!reqInfo.disable && (
                            <button
                              onClick={() =>
                                handleStatus("Disable", reqInfo._id)
                              }
                              disabled={loading}
                            >
                              Disable
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(reqInfo._id)}
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

export default AdminProvePost;
