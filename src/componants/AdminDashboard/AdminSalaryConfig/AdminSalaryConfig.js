import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext, imageContext } from "../../../App";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { FaRegUserCircle } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";

const AdminSalaryConfig = () => {
  const [input, setInput] = useState({});
  const [addSalaryInput, setAddSalaryInput] = useState({});
  const [activeTab, setActiveTab] = useState("config");
  const [userList, setUserList] = useState([]);
  const [config, setConfig] = useContext(configContext);
  const navigate = useNavigate();
  const { setViewImage } = useContext(imageContext);

  useEffect(() => {
    if (config.salary) {
      setInput((state) => {
        return {
          ...state,
          ...config.salary,
        };
      });
    }
  }, [config]);

  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    const numberNameList = [
      "salaryCountDay",
      "salaryCountDay",
      "salaryPaymentAmount",
      "salaryCountReferNumber",
    ];

    if (name.includes("salaryPaymentCondition")) {
      name = name.replace("salaryPaymentCondition.", "");
      if (numberNameList.includes(name) && value && isNaN(value)) {
        return;
      }
      setInput((state) => {
        return {
          ...state,
          salaryPaymentCondition: {
            ...state.salaryPaymentCondition,
            [name]: value,
          },
        };
      });
      return;
    }

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const handleAddSalaryInputChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    let numberNameList = ["salaryAmount"];
    if (numberNameList.includes(name) && value && isNaN(value)) {
      return;
    }

    setAddSalaryInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-salary/set-config`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify(input),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          setConfig(data.data);
          navigate(-1);
          SuccessTost(data.message || "Config has been added successfully");
        } else {
          FailedTost(data.message || "Failed to update config")
        }
      });
  };
  const onSalarySubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-salary/add-salary`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify(addSalaryInput),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          navigate(-1);
          setAddSalaryInput({});
          SuccessTost(data.message || "Salary has been added successfully");
        } else {
          FailedTost(data.message || "Failed to added salary")
        }
      });
  };
  const handleSearchUser = (e) => {
    handleAddSalaryInputChange(e);
    const value = e.target.value;
    fetch(
      `${
        process.env.REACT_APP_SERVER_HOST_URL
      }/admin-profile/all-user?page="1"&search=${value || ""}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.data || []);
      });
  };
  console.log("addSalaryInput ==>>", addSalaryInput);
  return (
    <div className="admin-add-daily-task">
      <div className="header-section">
        <button
          className={activeTab === "config" ? "active" : ""}
          onClick={() => setActiveTab("config")}
        >
          Salary Config
        </button>
        <button
          className={activeTab === "add-salary" ? "active" : ""}
          onClick={() => setActiveTab("add-salary")}
        >
          Add Salary
        </button>
      </div>
      <div className="wrap-contact2">
        {activeTab === "config" && (
          <form className="contact2-form validate-form">
            <span className="contact2-form-title">Set Salary Config</span>

            <div className="validate-input">
              <input
                className={`input2 ${input.salaryNotice ? "fill" : ""}`}
                type="text"
                value={input.salaryNotice || ""}
                name="salaryNotice"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Notice</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${input.salaryRuleNotice ? "fill" : ""}`}
                type="text"
                value={input.salaryRuleNotice || ""}
                name="salaryRuleNotice"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Rule Notice</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${input.salaryBonusNotice ? "fill" : ""}`}
                type="text"
                value={input.salaryBonusNotice || ""}
                name="salaryBonusNotice"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Bonus Notice</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${input?.salaryHistoryTitle ? "fill" : ""}`}
                type="text"
                value={input?.salaryHistoryTitle || ""}
                name="salaryHistoryTitle"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary History Title</span>
            </div>

            <div className="validate-input">
              <input
                className={`input2 ${
                  input?.salaryPaymentCondition?.salaryCountDay ? "fill" : ""
                }`}
                type="text"
                value={input?.salaryPaymentCondition?.salaryCountDay || ""}
                name="salaryPaymentCondition.salaryCountDay"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Count Day</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${
                  input?.salaryPaymentCondition?.salaryCountReferNumber
                    ? "fill"
                    : ""
                }`}
                type="text"
                value={
                  input?.salaryPaymentCondition?.salaryCountReferNumber || ""
                }
                name="salaryPaymentCondition.salaryCountReferNumber"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Count Refer Number</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${
                  input?.salaryPaymentCondition?.salaryPaymentAmount
                    ? "fill"
                    : ""
                }`}
                type="text"
                value={input?.salaryPaymentCondition?.salaryPaymentAmount || ""}
                name="salaryPaymentCondition.salaryPaymentAmount"
                onChange={handleChange}
              />
              <span className="focus-input2">Salary Payment Amount</span>
            </div>

            <div className="container-contact2-form-btn">
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
        {activeTab === "add-salary" && (
          <form className="contact2-form validate-form">
            <span className="contact2-form-title">Add Salary</span>

            <div className="validate-input">
              <input
                className={`input2 ${addSalaryInput.search ? "fill" : ""}`}
                type="text"
                value={addSalaryInput.search || ""}
                name="search"
                onChange={handleSearchUser}
              />
              <span className="focus-input2">Search User</span>
              {addSalaryInput.search && userList.length > 0 && (
                <div className="list-container">
                  {userList.map((user, index) => {
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setAddSalaryInput((state) => {
                            return {
                              ...state,
                              search: "",
                              fullName: `${user?.firstName} ${user?.lastName}`,
                              phoneNumber: user?.phoneNumber,
                              userID: user?._id,
                            };
                          });
                          setUserList([]);
                        }}
                      >
                        {user?.profilePicture && (
                          <img
                            src={getImageUrl(user?.profilePicture)}
                            alt=""
                            onDoubleClick={() =>
                              setViewImage(getImageUrl(user?.profilePicture))
                            }
                          />
                        )}
                        {!user?.profilePicture && <FaRegUserCircle />}
                        {`${user?.firstName} ${user?.lastName} (${user?.phoneNumber})`}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="validate-input">
              <input
                className={`input2 ${addSalaryInput.fullName ? "fill" : ""}`}
                type="text"
                value={addSalaryInput.fullName || ""}
              />
              <span className="focus-input2">User Name</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${
                  addSalaryInput.salaryAmount ? "fill" : ""
                }`}
                type="text"
                value={addSalaryInput.salaryAmount || ""}
                name="salaryAmount"
                onChange={handleAddSalaryInputChange}
              />
              <span className="focus-input2">SALARY Amount</span>
            </div>
            <div className="validate-input calender-section">
              <span className="focus-input2"> SALARY DATE</span>
              <input
                type="date"
                value={addSalaryInput.salaryDate || ""}
                onChange={handleAddSalaryInputChange}
                name="salaryDate"
              />
            </div>
            <div className="container-contact2-form-btn">
              <button type="submit" onClick={onSalarySubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminSalaryConfig;
