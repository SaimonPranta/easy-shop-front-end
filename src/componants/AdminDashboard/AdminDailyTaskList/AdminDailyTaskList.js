import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../shared/cooki";
import { dateToString } from "../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import { dateToDateString } from "../../../shared/functions/formateDate";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { imageContext, } from "../../../App";

const AdminDailyTaskList = () => {
  const [filterInput, setFilterInput] = useState({
    // tableType: "Group Daily Task"
  });
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [reRender, setReRender] = useState(false);
  const debounceState = useRef();
  const { setViewImage } = useContext(imageContext);

  const navigate = useNavigate();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/daily-task-list?page=${page}`,
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
            setCurrentPage(Number(data.page - 1));
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
  }, [page, filterInput.searchSubmit, reRender]);

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
  const handleSelectDailyTask = (taskID, taskGroupID) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/delete-daily-task`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify({ taskID, taskGroupID }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data ==>>", data);
        if (data.data) {
          setReRender((state) => !state);
        }
      });
  };
  const handleDeleteDailyTask = (taskID, taskGroupID) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/select-daily-task`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify({ taskID, taskGroupID }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data ==>>", data);
        if (data.data) {
          const updateList = tableItems.filter((item) => item._id !== taskID)
          setTableItems(updateList)
        }
      });
  };
  const handleDailyTaskStatus = (taskListID, status) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/daily-task-status`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify({ taskListID, status }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data ==>>", data);
        if (data.data) {
          setReRender((state) => !state);
        }
      });
  };

  const handleConfigNavigation = (taskListID) => {
    console.log("taskListID =>", taskListID);
    if (taskListID) {
      navigate(`/admin/add-daily-task?taskListID=${taskListID}`);
    } else {
      navigate("/admin/add-daily-task");
    }
  };
  const handleSetEditTasklistNavigation = (taskListID) => {
    navigate(`/admin/add-daily-task?dailyTaskID=${taskListID}`);
  };
  const handleGroupBtn = (id) => {
    setFilterInput((state) => {
      return {
        groupID: id,
        searchSubmit: !state.searchSubmit,
      };
    });
  };
  return (
    <div className="admin-withdraw">
      <div className="btn-container">
        <button onClick={() => handleConfigNavigation(null)}>Add Task</button>
      </div>
      <div className="common-table-section">
        <h4 className="dashboard-title">Admin Daily Task List</h4>
        <div className="balance-section"></div>
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
            <select name="tableType" onChange={handleInputChange}>
              <option>Daily Task</option>
              <option>Group Daily Task</option>
            </select>
            <input
              type="text"
              placeholder="Search here ..."
              name="search"
              value={filterInput.search || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="submit-section">
            <button onClick={handleFilterSubmit}>Filter</button>
          </div>
        </div>
        <div className="table-section" id="table-list" onScroll={handleScroll}>
          {filterInput?.tableType !== "Group Daily Task" && (
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th>Image</th>
                  <th className="big">Title</th>
                  <th>Task Link</th>
                  <th>Tutorial Link</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={index}>
                        <td className="small">{index + 1}</td>
                        <td className="img">
                          <img
                            src={getImageUrl(reqInfo?.img)}
                            alt=""
                            onDoubleClick={() =>
                              setViewImage(getImageUrl(reqInfo?.img))
                            }
                          />
                        </td>
                        <td>{reqInfo?.description}</td>
                        <td className="dotted">
                          <a href={reqInfo?.taskLink} target="_blank">
                            {reqInfo?.taskLink}
                          </a>
                        </td>
                        <td className="dotted">
                          <a href={reqInfo?.tutorialLink} target="_blank">
                            {reqInfo?.tutorialLink}
                          </a>
                        </td>
                        <td>
                          {dateToDateString(reqInfo?.taskListID?.taskStartDate)}
                        </td>
                        <td>
                          {dateToDateString(
                            reqInfo?.taskListID?.taskExpireDate
                          )}
                        </td>
                        <td className={`btn-container `}>
                          <div>
                            <button
                              onClick={() =>
                                handleGroupBtn(reqInfo?.taskListID?._id)
                              }
                            >
                              Group
                            </button>
                            <button
                              disabled={
                                reqInfo?.taskListID?.currentTaskID ===
                                reqInfo?._id
                              }
                              onClick={() =>
                                handleSelectDailyTask(
                                  reqInfo._id,
                                  reqInfo?.taskListID?._id
                                )
                              }
                            >
                              Select
                            </button>
                            <button
                              onClick={() =>
                                handleSetEditTasklistNavigation(reqInfo?._id)
                              }
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleSelectDailyTask(
                                  reqInfo._id,
                                  reqInfo?.taskListID?._id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {filterInput?.tableType === "Group Daily Task" && (
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th>Image</th>
                  <th className="big">Title</th>
                  <th>Task Link</th>
                  <th>Tutorial Link</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((taskListInfo, index) => {
                    return taskListInfo?.taskList?.map((reqInfo, subIndex) => {
                      return (
                        <tr key={index * subIndex}>
                          {subIndex === 0 && (
                            <td
                              className="small"
                              rowSpan={taskListInfo?.taskList?.length}
                            >
                              {index + 1}
                            </td>
                          )}
                          <td className="img">
                            <img
                              src={`${process.env.REACT_APP_SERVER_HOST_URL}/${reqInfo?.img}`}
                              alt=""
                            />
                          </td>
                          <td>{reqInfo?.description}</td>
                          <td className="dotted">
                            <a href={reqInfo?.taskLink} target="_blank">
                              {reqInfo?.taskLink}
                            </a>
                          </td>
                          <td className="dotted">
                            <a href={reqInfo?.tutorialLink} target="_blank">
                              {reqInfo?.tutorialLink}
                            </a>
                          </td>
                          {subIndex === 0 && (
                            <>
                              {" "}
                              <td rowSpan={taskListInfo?.taskList?.length}>
                                {dateToDateString(
                                  reqInfo?.taskListID?.taskStartDate
                                )}
                              </td>
                              <td rowSpan={taskListInfo?.taskList?.length}>
                                {dateToDateString(
                                  reqInfo?.taskListID?.taskExpireDate
                                )}
                              </td>{" "}
                            </>
                          )}

                          {subIndex === 0 && (
                            <td
                              rowSpan={taskListInfo?.taskList?.length}
                              className={`btn-container-center `}
                            >
                              <div>
                                {taskListInfo.inactive && (
                                  <button
                                    onClick={() =>
                                      handleDailyTaskStatus(
                                        taskListInfo?._id,
                                        "Enable"
                                      )
                                    }
                                  >
                                    Enable
                                  </button>
                                )}
                                {!taskListInfo.inactive && (
                                  <button
                                    onClick={() =>
                                      handleDailyTaskStatus(
                                        taskListInfo?._id,
                                        "Disable"
                                      )
                                    }
                                  >
                                    Disable
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    handleConfigNavigation(taskListInfo?._id)
                                  }
                                >
                                  Add
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    });
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDailyTaskList;
