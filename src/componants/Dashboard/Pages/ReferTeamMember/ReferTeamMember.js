import React, { useContext, useEffect, useRef, useState } from "react";
import { imageContext } from "../../../../App";
import "./ReferTeamMember.scss";
import { userHeader } from "../../../../shared/cooki";
import { dateToString } from "../../../../shared/functions/dateConverter"; 
import { ToastContainer } from "react-toastify";
import { AiOutlineTeam } from "react-icons/ai";
import getImageUrl from "../../../../shared/functions/getImageUrl";
import { FaRegUserCircle } from "react-icons/fa";

const Withdraw = () => {
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [referList, setReferList] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReferList, setShowReferList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastBalance, setLastBalance] = useState({
    mainBalance: 0,
    salesBalance: 0,
    taskBalance: 0,
  });
  const [searchBalance, setSearchBalance] = useState({
    totalReferUser: 0, 
  });
  const { setViewImage } = useContext(imageContext);

  const debounceState = useRef();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/profile/generation-team-member-list?page=${page}`,
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
              setSearchBalance({
                totalReferUser: data.totalReferUser || 0
              });
            } else {
              setSearchBalance((state) => {
                return {
                  ...state,
                  totalReferUser : state.totalReferUser + data.totalReferUser
                }
              }) 
              setTableItems((state) => {
                return [...state, ...data.data];
              });
            }
          } else {
            setTableItems([]);
          }
          if (data.page) {
            setCurrentPage(Number(data.page) - 1);
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

  const handleFilterInputChange = (e) => {
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
  const handleUserList = (id) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/profile/refer-list?userID=${id}`,
      {
        method: "GET",
        headers: {
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setReferList(data.data);
          setShowReferList(true);
        }
      });
  };
  const goBack = () => {
    setShowReferList(false);
    setReferList([]);
  };

  return (
    <div className="refer-team-member-page">
      <div className="inner-section">
        <div className="common-table-section">
          <h4 className="table-title">Refer Team Members</h4>
          <div className="balance-section">
            <div className="grid-section">
              <div className="item">
                <div className="top">
                  <AiOutlineTeam />
                  <strong>{searchBalance.totalReferUser}</strong>
                  <p>{/* {searchBalance[item.property]} */}</p>
                </div>
              </div>
            </div>
          </div>
          {!showReferList && (
            <div className="filter-section">
              <div className="input-section">
                <div className="date">
                  <span>From</span>
                  <input
                    type="date"
                    name="fromDate"
                    value={filterInput.fromDate || ""}
                    onChange={handleFilterInputChange}
                  />
                </div>
                <div className="date">
                  <span>To</span>
                  <input
                    type="date"
                    name="toDate"
                    value={filterInput.toDate || ""}
                    onChange={handleFilterInputChange}
                  />
                </div>
              </div>

              <div className="submit-section">
                <button onClick={handleFilterSubmit}>Filter</button>
              </div>
            </div>
          )}
          {!showReferList && (
            <div
              className="table-section"
              id="table-list"
              onScroll={handleScroll}
            >
              <table>
                <thead>
                  <tr>
                    <th className="small">#</th>
                    <th> Date</th>
                    <th> Profile</th>
                    <th> User Name</th>
                    <th>User Account Number</th>
                    <th>Reffer</th>
                    <th>Visit Reffer List</th>
                  </tr>
                </thead>
                <tbody>
                  {tableItems?.length > 0 &&
                    tableItems.map((reqInfo, index) => {
                      return (
                        <tr key={reqInfo._id}>
                          <td className="small">{index + 1}</td>
                          <td className="date">
                            {dateToString(reqInfo.createdAt)}
                          </td>
                          <td className="img">
                            {reqInfo?.referredUser?.profilePicture && (
                              <img
                                src={getImageUrl(
                                  reqInfo?.referredUser?.profilePicture
                                )}
                                alt=""
                                onDoubleClick={() =>
                                  setViewImage(
                                    getImageUrl(
                                      reqInfo?.referredUser?.profilePicture
                                    )
                                  )
                                }
                              />
                            )}
                            {!reqInfo?.referredUser?.profilePicture && (
                              <FaRegUserCircle />
                            )}
                          </td>
                          <td className="big">{`${reqInfo?.referredUser?.firstName} ${reqInfo?.referredUser?.lastName}`}</td>
                          <td className="big">
                            {reqInfo?.referredUser?.phoneNumber}
                          </td>
                          <td>{reqInfo?.referCount}</td>
                          <td className={`btn-container big `}>
                            <div>
                              <button
                                onClick={() => {
                                  handleUserList(reqInfo?.referredUser?._id);
                                }}
                              >
                                Reffer List
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {showReferList && (
            <>
              <div className="back-btn-section">
                <button onClick={goBack}>Back</button>
              </div>
              <div className="table-section">
                <table>
                  <thead>
                    <tr>
                      <th className="small">#</th>
                      <th> Joining Date</th>
                      <th> Profile</th>
                      <th> Name</th>
                      <th>Account Number</th>
                      <th>Referred By</th>
                      <th>Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referList?.length > 0 &&
                      referList.map((reqInfo, index) => {
                        return (
                          <tr key={reqInfo._id}>
                            <td className="small">{index + 1}</td>
                            <td className="date">
                              {reqInfo?.referredUser?.joinDate}
                            </td>
                            <td className="img">
                              {reqInfo?.referredUser?.profilePicture && (
                                <img
                                  src={getImageUrl(
                                    reqInfo?.referredUser?.profilePicture
                                  )}
                                  alt=""
                                  onDoubleClick={() =>
                                    setViewImage(
                                      getImageUrl(
                                        reqInfo?.referredUser?.profilePicture
                                      )
                                    )
                                  }
                                />
                              )}
                              {!reqInfo?.referredUser?.profilePicture && (
                                <FaRegUserCircle />
                              )}
                            </td>
                            <td className="big">{`${reqInfo?.referredUser?.firstName} ${reqInfo?.referredUser?.lastName}`}</td>
                            <td className="big">
                              {reqInfo?.referredUser?.phoneNumber}
                            </td>
                            <td>
                              {reqInfo?.referredUser?.referUser?.phoneNumber}
                            </td>
                            <td>{reqInfo?.referredUser?.rank}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Withdraw;
