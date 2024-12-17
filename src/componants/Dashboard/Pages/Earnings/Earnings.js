import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../../shared/cooki";
import { dateToString } from "../../../../shared/functions/dateConverter";
import { userContext } from "../../../../App";
import wallet from "../../../../assets/images/dashboard/wallet.png";

const balanceArray = [
  {
    property: "todayEarning",
    label: "Today's Earning",
  },
  {
    property: "yesterdayEarning",
    label: "Yesterday's Earning",
  },
];
const tableBalanceArray = [
  {
    title: "Main Balance",
    property: "mainBalance",
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
    title: "Total Balance",
    property: "totalBalance",
  },
];

const Earnings = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState({
    todayEarning: 0,
    yesterdayEarning: 0,
  });
  const [searchBalance, setsSearchBalance] = useState({
    mainBalance: 0,
    taskBalance: 0,
    salesBalance: 0,
    totalBalance: 0,
  });
  const [user] = useContext(userContext);

  const debounceState = useRef();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/earnings?page=${page}`, {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify(filterInput),
      })
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
          if (data.totalBalance) {
            if (page === 1) {
              setsSearchBalance(data.totalBalance);
            } else {
              setsSearchBalance((state) => {
                // data.totalBalance
                state.mainBalance =
                  state.mainBalance + data.totalBalance?.mainBalance;
                state.taskBalance =
                  state.taskBalance + data.totalBalance?.taskBalance;
                state.salesBalance =
                  state.salesBalance + data.totalBalance?.salesBalance;
                state.totalBalance =
                  state.totalBalance + data.totalBalance?.totalBalance;
                return {
                  ...state,
                };
              });
            }
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
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/earnings/init-balance`, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setBalance(data.data);
        }
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

  return (
    <div className="earnings-page">
      <div className="inner-container">
        <h4 className="dashboard-title">Earnings</h4>
        <div className="earning-form">
          <div className="balance-section">
            <div className="total-balance-section">
              <div className="balance">
                <h6>
                  <strong>৳</strong>{" "}
                  {user.balance + user.salesBalance + user.taskBalance}
                </h6>
                <p>Total Earning</p>
              </div>
              <dvi className="date">
                <p>{`Date: ${dateToString(new Date()).split("||")[0]}`}</p>
              </dvi>
            </div>
            <div className="todays-balance-section">
              {balanceArray.map((item, index) => {
                return (
                  <div className="cart">
                    <h6>
                      {" "}
                      <strong>৳</strong> {balance[item.property]}
                    </h6>
                    <p>{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div></div>
        </div>
        <div className="common-table-section">
          <h4 className="dashboard-title">Earning History</h4>
          <div className="balance-section">
            <div className="grid-section">
              {tableBalanceArray.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="top">
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p>
                        <strong>৳</strong>
                        {searchBalance[item.property]}
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

              {/* <input
              type="text"
              placeholder="Search here ..."
              name="search"
              value={filterInput.search || ""}
              onChange={handleInputChange}
            /> */}
            </div>

            <div className="submit-section">
              <button onClick={handleFilterSubmit}>Filter</button>
            </div>
          </div>
          <div
            className="table-section"
            id="table-list"
            onScroll={handleScroll}
          >
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th className="big">Date</th>
                  <th className="big">Main Balance</th>
                  <th className="big">Task Balance</th>
                  <th className="big">Sales Balance</th>
                  <th className="big">Total Balance</th>
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
                        <td className="date">{dateToString(reqInfo.date)}</td>
                        <td>${reqInfo.mainBalance}</td>
                        <td>${reqInfo.taskBalance}</td>
                        <td>${reqInfo.salesBalance}</td>
                        <td>${reqInfo.totalBalance}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Earnings;
