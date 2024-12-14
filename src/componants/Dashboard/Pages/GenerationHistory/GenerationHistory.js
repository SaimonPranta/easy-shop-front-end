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
import { ImUsers } from "react-icons/im";

const tableBalanceArray = [
  {
    title: "Total User",
    property: "totalReferMember",
  },
  {
    title: "Total Commission",
    property: "totalIncome",
    tk: true,
  },
];

const Index = () => {
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({
    fromDate: "2024-12-14",
    toDate: "2024-12-14",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchBalance, setSearchBalance] = useState({
    totalIncome: 0,
    totalReferMember: 0,
  });
  const navigate = useNavigate();

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
        `${process.env.REACT_APP_SERVER_HOST_URL}/profile/generation-history`,
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
            setTableItems(data?.data?.generationList);
            setSearchBalance({
              totalIncome: data.data.totalIncome,
              totalReferMember: data.data.totalReferMember,
            });
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

  return (
    <div className="generation-history">
      <div className="inner-section">
        <div className="common-table-section">
          <h4 className="table-title">Generation History</h4>
          <div className="balance-section">
            <div className="grid-section">
              {tableBalanceArray.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="top">
                    {item.tk && <img src={wallet} alt="" />}
                    {!item.tk && <ImUsers />}
                      <strong>{item.title}</strong>
                      <p>
                        {item.tk && <strong>৳</strong>}

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
                  <th>Generation</th>
                  <th>Member</th>
                  <th>View User List</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo._id}>
                        <td className="big">{`${index + 1} Generation`}</td>
                        <td>{reqInfo?.count}</td>
                        <td className="btn-container">
                          <div>
                            <button
                              onClick={() => {
                                navigate(`/generation/${index + 1}?from=${filterInput.fromDate}&to=${filterInput.toDate}`);
                              }}
                            >
                              View List
                            </button>
                          </div>
                        </td>
                        <td>{`$${reqInfo?.incomes}`}</td>
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

export default Index;
