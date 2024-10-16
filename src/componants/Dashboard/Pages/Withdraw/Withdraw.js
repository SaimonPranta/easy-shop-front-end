import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, userContext } from "../../../../App";
import "./Withdraw.scss";
import { userHeader } from "../../../../shared/cooki";
import bkash from '../../../../assets/images/bank_icon/bkash.png'
import roket from '../../../../assets/images/bank_icon/roket.png'
import upai from '../../../../assets/images/bank_icon/upai.png'
import nogod from '../../../../assets/images/bank_icon/nogod.png'
import wallet from '../../../../assets/images/dashboard/wallet.png'
import { dateToString } from "../../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import SuccessTost from '../../../../shared/components/SuccessTost/SuccessTost'
import FailedTost from '../../../../shared/components/FailedTost/FailedTost'
import { ToastContainer } from 'react-toastify';


const balanceNameArray = [
  {
    title: "Main Balance",
    property: "mainBalance",
    mainProperty: "balance",

  },
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
]
const tableBalanceArray = [
  {
    title: "Pending Balance",
    property: "pendingBalance"
  },
  {
    title: "Approve Balance",
    property: "approveBalance"
  },
  {
    title: "Table Balance",
    property: "totalBalance"
  },
]
const paymentArray = [
  {
    title: "বিকাশ",
    property: "bikash",
    label: "Bkash",
    bg: "#D02253",
    img: bkash
  },
  {
    title: "নগদ",
    property: "nagad",
    label: "Nagad",
    bg: "#F6941C",
    img: nogod
  },
  {
    title: "রকেট",
    property: "rocket",
    label: "Rocket",
    bg: "#8F3893",
    img: roket
  },
  {
    title: "উপায়",
    property: "upay",
    label: "Upay",
    bg: "#FED602",
    img: upai
  },
]

const Withdraw = () => {
  const [input, setInput] = useState({
  });
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastBalance, setLastBalance] = useState({
    mainBalance: 0,
    salesBalance: 0,
    taskBalance: 0,
  });
  const [searchBalance, setSearchBalance] = useState({
    pendingBalance: 0,
    approveBalance: 0,
    totalBalance: 0
  })
  const [config] = useContext(configContext)
  const [user] = useContext(userContext)

  const debounceState = useRef()
  const navigate = useNavigate()
  // const [user, setUser] = useContext(userContext);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current)
    }
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/last-balance`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader()
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLastBalance(data.data)
        }
      })

  }, [])

  useEffect(() => {
    resetTimeout()
    debounceState.current = setTimeout(() => {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/get-list?page=${page}`, {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader()
        },
        body: JSON.stringify(filterInput)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            if (page === 1) {
              setTableItems((state) => {
                return [...data.data]
              })
            } else {
              setTableItems((state) => {
                return [...state, ...data.data]
              })
            }
          } else {
            setTableItems([])
          }
          if (data.page) {
            setCurrentPage(Number(data.page) - 1)
          }
          if (data.total) {
            setTotal(data.total)
          }
          setSearchBalance({
            pendingBalance: data.pendingBalance || 0,
            approveBalance: data.approveBalance || 0,
            totalBalance: data.totalBalance || 0
          })
        }).finally(() => {
          setLoading(false)
        })
    }, 3000);

    return () => {
      resetTimeout()
    }
  }, [page, filterInput.searchSubmit])

  const handleScroll = () => {
    console.log("Call scroll", { currentPage, page, currentLength: tableItems.length, total })
    if (loading) {
      return
    }
    if (total && total <= tableItems.length) {
      return
    }
    const container = document.getElementById("table-list")
    const scrollTop = container?.scrollTop || 0
    const offsetHeight = container?.offsetHeight || 0
    const scrollHeight = container?.scrollHeight || 0

    if (
      scrollHeight <= Number(scrollTop + offsetHeight) + 1
    ) {

      if (currentPage === page - 1) {
        setPage((state) => state + 1);
        setLoading(true)
      }
    }
  };

  const withdrawFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader()
        },
      })
      const data = await res.json()
      if (data.data) {
        SuccessTost("Withdraw request submitted successfully")
        setTableItems((state) => {
          return [data.data, ...state]
        })
      }else{
        FailedTost(data.message || "Withdraw request failed")
      }

      setLoading(false)
    } catch (error) {
      FailedTost(error.message || "Withdraw request failed")
      setLoading(false)

    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setInput((state) => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  const handleFilterInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFilterInput((state) => {
      return {
        ...state,
        [name]: value
      }
    })

  }
  console.log(" ==>>", {
    page, currentPage
  })
  const handleFilterSubmit = () => {
    setPage(1)
    setFilterInput((state) => {
      return {
        ...state,
        searchSubmit: !state?.searchSubmit
      }
    })
  }
  const handleStatus = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/status`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const updateTable = tableItems.map((item) => {
            if (item._id === id) {
              item.status = data.data?.status
            }
            return item
          })
          setTableItems(updateTable)
        }
      })
  }
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="withdraw-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Withdraw Request</h4>
        <div className="withdraw-notice">
          <p>
            {`Percentage Withdraw Charge ${config?.withdraw?.withdrawCost || 0}%`}
          </p>
        </div>

        <div className="back-btn-section">
          <button onClick={goBack}>Back</button>
        </div>
        <div className="form-container">
          <div className="select-section">
            <div className="title-section">
              <p>Select your balance to withdraw</p>
            </div>
            <div className="grid-section">
              {
                balanceNameArray.map((item, index) => {
                  if (!config?.withdraw?.balances[item.property]) {
                    return <></>
                  }
                  return <div className="item" key={index}>
                    <div className={`top ${item.title === input.balanceType ? "active" : ""}`}>
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p><strong>৳</strong>{user[item.mainProperty] || 0}</p>
                    </div>
                    <div className="bottom">
                      <input type="radio" checked={item.title === input.balanceType ? true : false} onChange={() => {
                        setInput((state) => {
                          return {
                            ...state,
                            balanceType: item.title
                          }
                        })
                      }} />
                    </div>

                  </div>
                })
              }
            </div>
          </div>
          <div className="select-section">
            <div className="title-section">
              <p>Select withdrawal method</p>
            </div>
            <div className="grid-section">
              {
                paymentArray.map((item, index) => {
                  if (!config?.withdraw?.paymentMethods[item.property]) {
                    return <></>
                  }
                  return <div className="item payment" key={index}>
                    <div className={`top ${item.label === input.provider ? "active" : ""}`}>
                      <img src={item.img} alt="" />
                      <strong style={{ background: item.bg }}>{item.title}</strong>
                    </div>
                    <div className="bottom">
                      <input type="radio" checked={item.label === input.provider ? true : false} onClick={() => {
                        setInput((state) => {
                          return {
                            ...state,
                            provider: item.label
                          }
                        })
                      }} />
                    </div>

                  </div>
                })
              }
            </div>
          </div>

          <div className="input-section-container">
            <div className="input-section">
              <label>Your Withdraw Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber || ""}
                placeholder="Your Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-section">
              <label>Select Withdraw Amount</label>
              <select name="amount" onChange={handleInputChange}>
                <option hidden>-- Select Amount --</option>
                {
                  config?.withdraw?.withdrawAmounts?.length > 0 && config?.withdraw?.withdrawAmounts.map((item, index) => {
                    let disabled = true
                    if (input.balanceType === "Main Balance" && lastBalance.lastMainBalance < item.balance) {
                      disabled = false
                    } else if (input.balanceType === "Sales Balance" && lastBalance.lastSalesBalance < item.balance) {
                      disabled = false
                    } else if (input.balanceType === "Task Balance" && lastBalance.lastTaskBalance < item.balance) {
                      disabled = false
                    }
                    return <option value={item.balance} key={index} disabled={disabled}>{`${item.balance}TK`}</option>
                  })
                }
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
              <button onClick={withdrawFormHandler} disabled={loading} > Submit </button>
            </div>
          </div>

        </div>
        <div className="common-table-section">
          <h4 className="table-title">WITHDRAW  HISTORY</h4>
          <div className="balance-section">
            <div className="grid-section">
              {
                tableBalanceArray.map((item, index) => {
                  return <div className="item" key={index}>
                    <div className="top">
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p><strong>৳</strong>{searchBalance[item.property]}</p>
                    </div>

                  </div>
                })
              }
            </div>
          </div>
          <div className="filter-section">
            <div className="input-section">
              <div className="date">
                <span>From</span>
                <input type="date" name='fromDate' value={filterInput.fromDate || ""} onChange={handleFilterInputChange} />
              </div>
              <div className="date">
                <span>To</span>
                <input type="date" name='toDate' value={filterInput.toDate || ""} onChange={handleFilterInputChange} />
              </div>
              <select name='balance' onChange={handleFilterInputChange}>
                <option hidden >Select Balance</option>
                <option>Main Balance</option>
                <option>Sales Balance</option>
                <option>Task Balance</option>
              </select>
              <input type="text" placeholder="Search here ..." name='search' value={filterInput.search || ""} onChange={handleFilterInputChange} />
            </div>

            <div className="submit-section" >
              <button onClick={handleFilterSubmit}>Filter</button>
            </div>
          </div>
          <div className="table-section" id="table-list" onScroll={handleScroll}>
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th> Method</th>
                  <th> Number</th>
                  <th> Balance</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                {tableItems?.length > 0 && tableItems.map((reqInfo, index) => {
                  return (
                    <tr key={reqInfo._id}>
                      <td className="small">{index + 1}</td>
                      <td>{reqInfo?.withdraw?.provider}</td>
                      <td>{reqInfo?.withdraw?.phoneNumber}</td>
                      <td className="big">{reqInfo?.balanceType}</td>
                      <td>৳{reqInfo?.amount}</td>
                      <td className="date">{dateToString(reqInfo.createdAt)}</td>
                      <td>{reqInfo?.status}</td>
                      <td className={`btn-container ${reqInfo.status.toLowerCase()}`}>
                        <div>
                          <button
                            disabled={reqInfo.status !== "Pending"}
                            onClick={() => handleStatus(reqInfo._id)}
                          >Cancel</button>
                        </div>
                      </td>
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
