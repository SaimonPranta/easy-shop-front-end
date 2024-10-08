import React, { useEffect, useState } from 'react';
import './style.scss'
import SuccessTost from '../../../shared/components/SuccessTost/SuccessTost'
import { ToastContainer } from 'react-toastify';
import { userHeader } from '../../../shared/cooki';
import { dateToString } from '../../../shared/functions/dateConverter';



const AdminDailyTask = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-withdraw?page=${page}`, {
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
              return [ ...data.data]
            })
          }else{
            setTableItems((state) => {
              return [...state, ...data.data]
            })
          }
        }
        if (data.total) {
          setTotal(data.total)
        }
      })
  }, [page, filterInput.searchSubmit])

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
  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFilterInput((state) => {
      return {
        ...state,
        [name]: value
      }
    })

  }

const handleFilterSubmit = () => {
  setPage(1)
  setFilterInput((state) => {
    return {
      ...state,
      searchSubmit: !state?.searchSubmit
    }
  })
}
console.log("filterInput ==>", filterInput)

  return (
    <div className='admin-withdraw'>
      <div className="common-table-section">
        <h4 className="dashboard-title">ADMIN WITHDRAW  HISTORY</h4>
        <div className="balance-section">
          {/* <div className="grid-section">
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
            </div> */}
        </div>
        <div className="filter-section">
          <div className="input-section">
            <div className="date">
              <span>From</span>
              <input type="date" name='fromDate' value={filterInput.fromDate || ""} onChange={handleInputChange} />
            </div>
            <div className="date">
              <span>To</span>
              <input type="date" name='toDate' value={filterInput.toDate || ""}  onChange={handleInputChange}  />
            </div>
            <select name='balance' onChange={handleInputChange}>
              <option>Select Balance</option>
              <option>Main Balance</option>
              <option>Sales Balance</option>
              <option>Task Balance</option>
            </select>
            <input type="text" placeholder="Search here ..." name='search' value={filterInput.search || ""}  onChange={handleInputChange} />
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
                <th>User Name</th>
                <th>User ID</th>
                <th>Balance Type</th>
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
                  <tr key={index}>
                    <td className="small">{index + 1}</td>
                    <td>{reqInfo?.userID?.fullName}</td>
                    <td>{reqInfo?.userID?.phoneNumber}</td>
                    <td>{reqInfo?.balanceType}</td>
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

      <ToastContainer />
    </div>
  );
};

export default AdminDailyTask;