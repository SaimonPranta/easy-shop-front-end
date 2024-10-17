import React, { useEffect, useRef, useState } from 'react';
import './style.scss'
import SuccessTost from '../../../shared/components/SuccessTost/SuccessTost'
import FailedTost from '../../../shared/components/FailedTost/FailedTost'
import { ToastContainer } from 'react-toastify';
import { userHeader } from '../../../shared/cooki';
import { dateToString } from '../../../shared/functions/dateConverter';
import { useNavigate } from 'react-router-dom';
import { dateToDateString } from '../../../shared/functions/formateDate';


const AdminDailyTaskList = () => {
  const [filterInput, setFilterInput] = useState({});
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const debounceState = useRef()

  const navigate = useNavigate()


  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current)
    }
  }
  useEffect(() => {
    resetTimeout()
    debounceState.current = setTimeout(() => {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/daily-task-list?page=${page}`, {
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
            setCurrentPage(Number(data.page - 1))
          }
          if (data.total) {
            setTotal(data.total)
          }
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
  const handleStatus = (status, id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-withdraw/status`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ status, id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          let updateTable = []
          if (status === "Delete") {
            updateTable = tableItems.filter((item) => {
              if (item._id === id) {
                return false
              }
              return true
            })
            SuccessTost("Successfully removed transaction")
          } else {
            SuccessTost(`Transaction status updated to ${status}`)
            updateTable = tableItems.map((item) => {
              if (item._id === id) {
                item.status = data.data?.status
              }
              return item
            })
          }
          setTableItems(updateTable)
        } else {
          FailedTost(data.message || "Failed to update user status")
        }
      })
  }

  const handleConfigNavigation = () => {
    navigate("/admin/daily-task")
  }

  return (
    <div className='admin-withdraw'>
      <div className='btn-container'>
        <button onClick={handleConfigNavigation}>Add Task</button>
      </div>
      <div className="common-table-section">
        <h4 className="dashboard-title">Admin Daily Task List</h4>
        <div className="balance-section">
        </div>
        <div className="filter-section">
          <div className="input-section">
            <div className="date">
              <span>From</span>
              <input type="date" name='fromDate' value={filterInput.fromDate || ""} onChange={handleInputChange} />
            </div>
            <div className="date">
              <span>To</span>
              <input type="date" name='toDate' value={filterInput.toDate || ""} onChange={handleInputChange} />
            </div>
            <select name='balance' onChange={handleInputChange}>
              <option>Select Balance</option>
              <option>Main Balance</option>
              <option>Sales Balance</option>
              <option>Task Balance</option>
            </select>
            <input type="text" placeholder="Search here ..." name='search' value={filterInput.search || ""} onChange={handleInputChange} />
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
                <th >Image</th>
                <th className='big'>Title</th>
                <th>Task Link</th>
                <th >Tutorial Link</th>
                <th >From Date</th>
                <th >To Date</th>
              </tr>
            </thead>
            <tbody >
              {tableItems?.length > 0 && tableItems.map((reqInfo, index) => {
                return (
                  <tr key={index}>
                    <td className="small">{index + 1}</td>
                    <td className="small">{index + 1}</td>
                    <td>{reqInfo?.description}</td>
                    <td className='dotted'><a href={reqInfo?.taskLink} target="_blank">{reqInfo?.taskLink}</a></td>
                    <td className='dotted'><a href={reqInfo?.tutorialLink} target="_blank">{reqInfo?.tutorialLink}</a></td>
                    <td >{dateToDateString(reqInfo?.taskListID?.taskStartDate)}</td>
                    <td >{dateToDateString(reqInfo?.taskListID?.taskExpireDate)}</td>
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

export default AdminDailyTaskList;