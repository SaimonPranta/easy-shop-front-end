import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, userContext } from "../../../../App";
import "./index.scss";
import { userHeader } from "../../../../shared/cooki";
import bkash from "../../../../assets/images/bank_icon/bkash.png";
import roket from "../../../../assets/images/bank_icon/roket.png";
import upai from "../../../../assets/images/bank_icon/upai.png";
import nogod from "../../../../assets/images/bank_icon/nogod.png";
import wallet from "../../../../assets/images/dashboard/wallet.png";
import { dateToString } from "../../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";

const tableBalanceArray = [
  {
    title: "Total Salary",
    property: "salaryBalance",
  },
];

const Withdraw = () => {
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
    totalBalance: 0,
  });
  const [config] = useContext(configContext);
  const [user] = useContext(userContext);

  const debounceState = useRef();
  const navigate = useNavigate();
  // const [user, setUser] = useContext(userContext);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/last-balance`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLastBalance(data.data);
        }
      });
  }, []);

  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/get-list?page=${page}`,
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
            pendingBalance: data.pendingBalance || 0,
            approveBalance: data.approveBalance || 0,
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

  return (
    <div className="notice-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Salary</h4>
        <div className="form-container">
          <div className="notice-notice">
            <p>{config?.salary?.salaryNotice}</p>
          </div>
          <div className="notice-notice white des">
            <p>{config?.salary?.salaryRuleNotice}</p>

            <div className="more-btn-container">
              <button>see more</button>
            </div>
          </div>
          <div className="notice-notice white">
            <p>{config?.salary?.salaryBonusNotice}</p>
          </div>

          <div className="common-table-section">
            <div className="balance-section">
              <div className="grid-section salary">
                {tableBalanceArray.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="top">
                        <img src={wallet} alt="" />
                        <strong>{item.title}</strong>
                        <p>
                          <strong>৳</strong>
                          {searchBalance[item.property] || 0}
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
              </div>

              <div className="submit-section">
                <button onClick={handleFilterSubmit}>Filter</button>
              </div>
            </div>
            <div
              className="history-section"
              id="table-list"
              onScroll={handleScroll}
            >
              {new Array(5).fill("").map((itemInfo, index) => {
                return (
                  <div className="cart">
                    <div className="salary-bonus">
                      <p>Salary Bonus</p>
                    </div>
                    <div className="des">
                      <p>{config?.salary?.salaryHistoryTitle}</p>
                    </div>
                    <div className="date-section">
                      <strong> ৳ 343</strong>
                      <p>Date: 34-34-3434</p>
                    </div>
                    <div className="footer-section">
                      <p>ID 34332234545</p>
                      <button>weekly</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Withdraw;
