import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../App";
import "./Withdraw.scss";
import { getCookies, userHeader } from "../../../../shared/cooki";
import bkash from '../../../../assets/images/bank_icon/bkash.png'
import roket from '../../../../assets/images/bank_icon/roket.png'
import upai from '../../../../assets/images/bank_icon/upai.png'
import nogod from '../../../../assets/images/bank_icon/nogod.png'
import wallet from '../../../../assets/images/dashboard/wallet.png'
import { dateToString } from "../../../../shared/functions/dateConverter";
const balanceNameArray = [
  {
    title: "Main Balance",
    property: "balance"
  },
  {
    title: "Sales Balance",
    property: "balance"
  },
  {
    title: "Task Balance",
    property: "balance"
  },
]
const tableBalanceArray = [
  {
    title: "Pending Balance",
    property: "balance"
  },
  {
    title: "Approve Balance",
    property: "balance"
  },
  {
    title: "Table Balance",
    property: "balance"
  },
]
const paymentArray = [
  {
    title: "বিকাশ",
    property: "balance",
    label: "Bkash",
    bg: "#D02253",
    img: bkash
  },
  {
    title: "নগদ",
    property: "balance",
    label: "Nagad",
    bg: "#F6941C",
    img: nogod
  },
  {
    title: "রকেট",
    property: "balance",
    label: "Rocket",
    bg: "#8F3893",
    img: roket
  },
  {
    title: "উপায়",
    property: "balance",
    label: "Upai",
    bg: "#FED602",
    img: upai
  },
]

const Withdraw = () => {
  const [input, setInput] = useState({
  });
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  // const [user, setUser] = useContext(userContext);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw?page=${page}`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader()
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data ==>>", data)
        if (data.data) {
          setTableItems((state) => {
            return [...state, ...data.data]
          })
        }
        if (data.total) {
          setTotal(data.total)
        }
      })
  }, [page])

  const handleScroll = () => {
    console.log("Call scroll")
    if (loading) {
      return
    }
    if (total && total <= currentPage.length) {
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
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader()
        },
      })
    } catch (error) {

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
  console.log("input ===>>>", input)

  return (
    <div className="withdraw-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Withdraw Request</h4>
        <div className="withdraw-notice">
          <p>
            Percentage Withdraw Charge 5%
          </p>
        </div>

        <div className="back-btn-section">
          <button>Back</button>
        </div>
        <div className="form-container">
          <div className="select-section">
            <div className="title-section">
              <p>Select your balance to withdraw</p>
            </div>
            <div className="grid-section">
              {
                balanceNameArray.map((item, index) => {
                  return <div className="item" key={index}>
                    <div className={`top ${item.title === input.balanceType ? "active" : ""}`}>
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p><strong>৳</strong>4587</p>
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
              <option hidden>Select Amount</option>
              <option value="100">100TK</option>
              <option value="200">200TK</option>
              <option value="300">300TK</option>
              <option value="400">400TK</option>
              <option value="500">500TK</option>
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
            <button onClick={withdrawFormHandler} > Submit </button>
          </div>


        </div>
        <div className="common-table-section">
          <h4 className="dashboard-title">WITHDRAW  HISTORY</h4>
          <div className="balance-section">
            <div className="grid-section">
              {
                tableBalanceArray.map((item, index) => {
                  return <div className="item" key={index}>
                    <div className="top">
                      <img src={wallet} alt="" />
                      <strong>{item.title}</strong>
                      <p><strong>৳</strong>3435</p>
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
                <input type="date" />
              </div>
              <div className="date">
                <span>To</span>
                <input type="date" />
              </div>
              <select>
                <option>Select Balance</option>
                <option>Main Balance</option>
                <option>Sales Balance</option>
                <option>Task Balance</option>
              </select>
              <input type="text" placeholder="Search here ..." />
            </div>

            <div className="submit-section">
              <button>Filter</button>
            </div>
          </div>
          <div className="table-section" id="table-list" onScroll={handleScroll}>
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th>Withdraw Method</th>
                  <th>Withdraw Number</th>
                  <th>Withdraw Amount</th>
                  <th>Withdraw Date</th>
                  <th>Withdraw Status</th>
                </tr>
              </thead>
              <tbody >
                {tableItems?.length > 0 && tableItems.map((reqInfo, index) => {
                  return (
                    <tr key={reqInfo._id}>
                      <td className="small">{index + 1}</td>
                      <td>{reqInfo?.withdraw?.provider}</td>
                      <td>{reqInfo?.withdraw?.phoneNumber}</td>
                      <td>{reqInfo?.amount}</td>
                      <td className="date">{dateToString(reqInfo.createdAt)}</td>
                      <td className={`btn ${reqInfo.status.toLowerCase()}`}>
                        <button>{reqInfo.status}</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Withdraw;
