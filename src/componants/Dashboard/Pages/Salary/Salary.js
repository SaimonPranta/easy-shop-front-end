import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, userContext } from "../../../../App";
import "./index.scss";
import { userHeader } from "../../../../shared/cooki";
import wallet from "../../../../assets/images/dashboard/wallet.png";
import { dateToCalenderFormat } from "../../../../shared/functions/dateConverter";
import { ToastContainer } from "react-toastify";

const tableBalanceArray = [
  {
    title: "Total Salary",
    property: "totalBalance",
  },
];

const Withdraw = () => {
  const [page, setPage] = useState({
    page: 1,
    currentPage: -1,
  });
  const [filterInput, setFilterInput] = useState({});
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [searchBalance, setSearchBalance] = useState({
    totalBalance: 0,
  });
  const [config] = useContext(configContext);
  const lastElementRef = useRef(null);

  const debounceState = useRef();
  // const [user, setUser] = useContext(userContext);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  console.log("page ===>>", page);
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/salary/get-list?page=${page.page}`,
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
            if (page.page === 1) {
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
            setPage((state) => {
              return {
                ...state,
                currentPage: Number(data.page) - 1,
              };
            });
          }
          if (data.total) {
            setTotal(data.total);
          }
          setSearchBalance({
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
  }, [page.page, filterInput.searchSubmit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          updatePageState();
        } else {
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
      console.log("Observer attached to the last element"); // Debugging
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
        console.log("Observer detached from the last element"); // Debugging
      }
    };
  }, []);

  const updatePageState = () => {
    if (loading) {
      return;
    }
    if (total && total <= tableItems.length) {
      return;
    }
    setPage((state) => {
      if (state.currentPage === state.page - 1) {
        setLoading(true);
        const updateState = state.page + 1;
        return {
          ...state,
          page: updateState,
        };
      }
      return {
        ...state,
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
    setPage({
      page: 1,
      currentPage: 0,
    });
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
            {!seeMore && (
              <p>{config?.salary?.salaryRuleNotice?.slice(0, 40)}</p>
            )}
            {seeMore && <p>{config?.salary?.salaryRuleNotice}</p>}

            {config?.salary?.salaryRuleNotice?.length > 40 && !seeMore && (
              <div className="more-btn-container">
                <button onClick={() => setSeeMore(true)}>see more</button>
              </div>
            )}
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
            <div className="history-section">
              {tableItems.map((itemInfo, index) => {
                return (
                  <div className="cart" key={index}>
                    <span className="count">{index + 1}</span>
                    <div className="salary-bonus">
                      <p>Salary Bonus</p>
                    </div>
                    <div className="des">
                      <p>{config?.salary?.salaryHistoryTitle}</p>
                    </div>
                    <div className="date-section">
                      <strong>{`৳${itemInfo?.amount}`}</strong>
                      <p>{`Date: ${dateToCalenderFormat(
                        itemInfo?.createdAt
                      )}`}</p>
                    </div>
                    <div className="footer-section">
                      <p>{`ID ${itemInfo?.id || ""}`}</p>
                      <button>weekly</button>
                    </div>
                  </div>
                );
              })}
              <div ref={lastElementRef} className="scroll-selector" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Withdraw;
