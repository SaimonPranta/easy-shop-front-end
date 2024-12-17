import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, userContext } from "../../../../App";
import "./styles.scss";
import { userHeader } from "../../../../shared/cooki";
import wallet from "../../../../assets/images/dashboard/wallet.png";
import { dateToString } from "../../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";

const balanceNameArray = [
  {
    title: "Sales Balance",
    property: "salesBalance",
    mainProperty: "salesBalance",
  },
  {
    title: "Task Balance",
    property: "taskBalance",
    mainProperty: "taskBalance",
  },
];
const tableBalanceArray = [
  {
    title: "Sales Balance",
    property: "salesBalance",
  },
  {
    title: "Task Balance",
    property: "taskBalance",
  },
  {
    title: "Table Balance",
    property: "totalBalance",
  },
];

const Withdraw = () => {
  const [input, setInput] = useState({});
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchBalance, setSearchBalance] = useState({
    salesBalance: 0,
    taskBalance: 0,
    totalBalance: 0,
  });
  const [config] = useContext(configContext);
  const [user, setUser] = useContext(userContext);

  const debounceState = useRef();
  const navigate = useNavigate();
  // const [user, setUser] = useContext(userContext);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/balance-transfer/get-list?page=${page}`,
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
            setCurrentPage(Number(data.page) - 1);
          }
          if (data.total) {
            setTotal(data.total);
          }
          setSearchBalance({
            salesBalance: data.salesBalance || 0,
            taskBalance: data.taskBalance || 0,
            totalBalance: data.totalBalance || 0,
          });
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

  const withdrawFormHandler = async (e) => {
    e.preventDefault();
    if (!user.isActive) {
      FailedTost("Sorry, Your account is not activated yet");
      return;
    }
    if (!user.availableForTask) {
      FailedTost(
        "This section is temporary disable for you, to enable this section you need to refer minimum 4 parson in last 15 days"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/balance-transfer`,
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
        }
      );
      const data = await res.json();
      if (data.userInfo) {
        setUser((state) => {
          return {
            ...state,
            ...data.userInfo
          }
        })
      }
      if (data.data) {
        SuccessTost("Withdraw request submitted successfully");
        setTableItems((state) => {
          return [data.data, ...state];
        });
        setInput({});
      } else {
        FailedTost(data.message || "Withdraw request failed");
      }

      setLoading(false);
    } catch (error) {
      FailedTost(error.message || "Withdraw request failed");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
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
  const handleStatus = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/status`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const updateTable = tableItems.map((item) => {
            if (item._id === id) {
              item.status = data.data?.status;
            }
            return item;
          });
          setTableItems(updateTable);
        }
      });
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="balance-transfer-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Balance Transfer</h4>

        <div className="back-btn-section">
          <button onClick={goBack}>Back</button>
        </div>
        <div className="form-container">
          <div className="select-section">
            <div className="title-section">
              <p>Select Transfer Balance</p>
            </div>
            <div className="grid-section">
              {balanceNameArray.map((item, index) => {
                if (!config?.balanceTransfer?.balances[item.property]) {
                  return <></>;
                }
                return (
                  <div className="item" key={index}>
                    <div
                      className={`top ${
                        item.title === input.balanceType ? "active" : ""
                      }`}
                    >
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p>
                        <strong>৳</strong>
                        {user[item.mainProperty]?.toFixed(2) || 0}
                      </p>
                    </div>
                    <div className="bottom">
                      <input
                        type="radio"
                        checked={
                          item.title === input.balanceType ? true : false
                        }
                        onChange={() => {
                          setInput((state) => {
                            return {
                              ...state,
                              balanceType: item.title,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="input-section-container">
            <div className="input-section">
              <label>Transfer Amount</label>
              <select name="amount" onChange={handleInputChange}>
                <option hidden>-- Select Amount --</option>
                {config?.balanceTransfer?.transferAmounts?.length > 0 &&
                  config?.balanceTransfer?.transferAmounts.map(
                    (item, index) => {
                      return (
                        <option
                          value={item.balance}
                          key={index}
                        >{`${item.balance}TK`}</option>
                      );
                    }
                  )}
                {/* <option value="1000">1000TK</option> */}
              </select>
            </div>
            <div className="input-section">
              <label>Your Account PIN</label>
              <input
                type="text"
                name="accountPIN"
                value={input.accountPIN || ""}
                placeholder="Your PIN"
                onChange={handleInputChange}
              />
            </div>
            <div className="submit-section">
              <button onClick={withdrawFormHandler} disabled={loading}>
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="common-table-section">
          <h4 className="table-title">BALANCE TRANSFER HISTORY</h4>
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
              <select name="balance" onChange={handleFilterInputChange}>
                <option hidden>Select Balance</option>
                <option>Sales Balance</option>
                <option>Task Balance</option>
              </select>
              
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
                  <th> Balance</th>
                  <th>Amount</th>
                  <th>Main Balance</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo._id}>
                        <td className="small">{index + 1}</td>
                        <td className="big">{reqInfo?.balanceType}</td>
                        <td>৳{reqInfo?.amount}</td>
                        <td>৳{user?.balance}</td>
                        <td className="date">
                          {dateToString(reqInfo.createdAt)}
                        </td>
                        <td>Completed</td>
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

export default Withdraw;
