import React, { useContext, useEffect, useState } from "react";
import "./style.scss"; 
import { getCooki } from "../../../shared/cooki";
import { configContext } from "../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { dateToCalenderFormat } from "../../../shared/functions/dateConverter";
const colorArray = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f39c12",
  "#5F4B8BFF",
  "#F95700FF",
  "#D6ED17FF",
  "#2C5F2D",
  "#0063B2FF",
  "#2BAE66FF",
];
const cooki = getCooki();

const AdminAddDailyTask = () => {
  const [input, setInput] = useState({ autoApprove: true });
  const [configInput, setConfigInput] = useState({});
  const [condition, setCondition] = useState({ btnLoading: false });
  const [activeTab, setActiveTab] = useState("daily-task");
  const [currentStyle, setCurrentStyle] = useState("");
  const [coinArray, setCoinArray] = useState([
    {
      coin: "",
      percentage: "",
      maxCount: "",
    },
  ]);
  const [config, setConfig] = useContext(configContext);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const taskListID = queryParams.get("taskListID");
  const dailyTaskID = queryParams.get("dailyTaskID");

  console.log("taskListID =>", taskListID);
  useEffect(() => {
    if (taskListID) {
      setInput({ taskListID });
    } else if (dailyTaskID) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/get-daily-task-details?dailyTaskID=${dailyTaskID}`
      )
        .then((data) => data.json())
        .then((data) => { 
          if (data.data) {
            setInput({ ...data.data, dailyTaskID });
          }
        });
    }
  }, [taskListID, dailyTaskID]);
  console.log("input ==>", input);

  useEffect(() => {
    const handleStyle = async () => {
      let nowCount = 0;
      // background: `conic-gradient( #e74c3c 0% 45%, #3498db 45% 55%,  #2ecc71 55% 80%,  #f39c12 80% 100% )`,
      let styleString = "";
      let totalPercent = 100;
      await coinArray.forEach(({ percentage, coin }, index) => {
        if (!percentage || !coin) {
          return;
        }
        styleString =
          styleString +
          `${colorArray[index]} ${nowCount}% ${nowCount + percentage}%,`;
        // styleString = styleString + `${colorArray[index]} ${nowCount}% ${nowCount + percentage}% ${coinArray.length !== index + 1 ? " ," : ""}`
        nowCount = nowCount + percentage;
      });
      // if (coinArray.length === index + 1) {
      styleString = styleString + `#FFF ${nowCount}% ${totalPercent}%`;
      // styleString = styleString + `#FFF ${nowCount}% ${nowCount + percentage}% ${coinArray.length !== index + 1 ? " ," : ""}`
      // }

      // await arrayOfCount.forEach((count, index) => {
      //   styleString = styleString + `${colorArray[index]} ${nowCount}% ${nowCount + count}% ${arrayOfCount.length !== index + 1 ? " ," : ""}`
      //   nowCount = nowCount + count

      // })
      setCurrentStyle(styleString);
    };
    handleStyle();
  }, [coinArray]);

  useEffect(() => {
    if (activeTab === "daily-task-config") {
      setConfigInput({
        maximumAmount: config?.dailyTask?.maximumAmount || "",
        tutorialVideoId: config?.dailyTask?.tutorialVideoId || "",
        pointConvertAmount: config?.dailyTask?.pointConvertAmount || "",
        taskNotice: config?.dailyTask?.taskNotice || "",
        taskOffNotice: config?.dailyTask?.taskOffNotice || "",
        taskStartDate: config?.dailyTask?.taskStartDate ? dateToCalenderFormat(config?.dailyTask?.taskStartDate ) : "",
        taskExpireDate: config?.dailyTask?.taskExpireDate ? dateToCalenderFormat(config?.dailyTask?.taskExpireDate) : "",
      });
    } else if (
      activeTab === "task-reward" &&
      config?.dailyTask?.taskRewardsList?.length
    ) {
      setCoinArray(config?.dailyTask?.taskRewardsList);
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "img") {
      return setInput((state) => {
        return {
          ...state,
          imageUpdate: true,
          [name]: e.target.files[0],
        };
      });
    }
    if (name === "autoApprove") {
      return setInput((state) => {
        return {
          ...state,
          [name]: e.target.checked,
        };
      });
    }

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const handleConfigChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setConfigInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("img", input.img);
    formData.append("data", JSON.stringify(input));
    setCondition((state) => {
      return {
        ...state,
        btnLoading: true,
      };
    });
    let endPoint = "/daily-task/admin-create-task";

    if (dailyTaskID) {
      endPoint = "/daily-task/admin-edit-task";
    }

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}${endPoint}`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data ===>>>", data);
        if (data.data) {
          navigate(-1);
          setInput({});
        }
      })
      .finally(() => {
        setCondition((state) => {
          return {
            ...state,
            btnLoading: false,
          };
        });
      });
  };
  const onRewardsSubmit = async (e) => {
    e.preventDefault();
    let totalPercentage = 0;

    await coinArray.forEach((item) => {
      if (Number(item?.percentage)) {
        totalPercentage = totalPercentage + Number(item.percentage);
      }
    });
    if (totalPercentage !== 100) {
      return;
    }
    const taskRewardsList = await coinArray.filter(
      (item) => item?.percentage > 1
    );

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/set-config`,
      {
        method: "POST",
        body: JSON.stringify({ taskRewardsList: taskRewardsList }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${cooki}`,
        },
      }
    );
    const data = await response.json();
    if (data.data) {
      setConfig(data.data);
    }
  };
  const onConfigSubmit = async (e) => {
    e.preventDefault();
    if (configInput.maximumAmount && Number(configInput.maximumAmount) < 1) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/set-config`,
      {
        method: "POST",
        body: JSON.stringify({ ...configInput }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${cooki}`,
        },
      }
    );
    const data = await response.json();
    if (data.data) {
      setConfig(data.data);
    }
  };

  const handleSetCoin = (e, inputIndex) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name !== "coin" && name !== "maxCount" && value && !Number(value)) {
      return;
    }

    let currentPercentage = Number(value) || 0;
    console.log("currentPercentage 0 =>>", currentPercentage);
    coinArray.forEach(({ coin, percentage }, index) => {
      console.log("percentage =>", percentage);
      if (index !== inputIndex) {
        currentPercentage = currentPercentage + percentage;
      }
    });
    console.log("currentPercentage 1 =>", currentPercentage);
    if (name !== "coin" && name !== "maxCount" && currentPercentage > 100) {
      return;
    }

    const updateArray = coinArray.map((obj, index) => {
      if (index === inputIndex) {
        return {
          ...obj,
          [name]: Number(value),
        };
      }
      return obj;
    });
    setCoinArray(updateArray);
  };

  return (
    <div className="admin-add-daily-task">
      <div className="header-section">
        <button
          className={activeTab === "daily-task" ? "active" : ""}
          onClick={() => setActiveTab("daily-task")}
        >
    Add Daily Task
        </button>
        <button
          className={activeTab === "task-reward" ? "active" : ""}
          onClick={() => setActiveTab("task-reward")}
        >
          Add Task Reward
        </button>
        <button
          className={activeTab === "daily-task-config" ? "active" : ""}
          onClick={() => setActiveTab("daily-task-config")}
        >
          Set Daily Task Config
        </button>
      </div>

      {activeTab === "daily-task" ? (
        <div className="wrap-contact2">
          <form className="contact2-form validate-form">
            <span className="contact2-form-title">Add Daily Task</span>

            {/* <div className="validate-input">
              <input className={`input2 ${input.title ? "fill" : ""}`} type="text" value={input.title || ""} name="title" onChange={handleChange} />
              <span className="focus-input2">TITLE</span>
            </div> */}
            <div className="validate-input">
              <input
                className={`input2 ${input.description ? "fill" : ""}`}
                type="text"
                value={input.description || ""}
                name="description"
                onChange={handleChange}
              />
              <span className="focus-input2">TITLE</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${input.taskLink ? "fill" : ""}`}
                type="text"
                value={input.taskLink || ""}
                name="taskLink"
                onChange={handleChange}
              />
              <span className="focus-input2">TASK LINK</span>
            </div>
            <div className="validate-input">
              <input
                className={`input2 ${input.tutorialLink ? "fill" : ""}`}
                type="text"
                value={input.tutorialLink || ""}
                name="tutorialLink"
                onChange={handleChange}
              />
              <span className="focus-input2">TUTORIAL LINK</span>
            </div>
            <div className="validate-input auto-approve">
              <span className="focus-input2">AUTO APPROVE</span>
              <input
                className="input2"
                checked={input.autoApprove || ""}
                name="autoApprove"
                onChange={handleChange}
                type="checkbox"
              />
            </div>
            <div className="validate-input image-section">
              <span className="focus-input2">UPLOAD IMAGE</span>
              <input
                className="input2"
                name="img"
                onChange={handleChange}
                type="file"
              />
            </div>
            {!taskListID && (
              <>
                <div className="validate-input calender-section">
                  <span className="focus-input2"> EXPIRE DATE</span>
                  <input
                    type="date"
                    value={input.taskStartDate || ""}
                    onChange={handleChange}
                    name="taskStartDate"
                  />
                </div>
                <div className="validate-input calender-section">
                  <span className="focus-input2"> EXPIRE DATE</span>
                  <input
                    type="date"
                    value={input.taskExpireDate || ""}
                    onChange={handleChange}
                    name="taskExpireDate"
                  />
                </div>
              </>
            )}

            <div className="container-contact2-form-btn">
              <button
                type="submit"
                disabled={condition?.btnLoading}
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : activeTab === "task-reward" ? (
        <div className="wrap-contact2">
          <form
            className="contact2-form validate-form"
            onSubmit={onRewardsSubmit}
          >
            <span className="contact2-form-title">Add Task Rewards</span>
            <div className="reward-circle">
              <div
                class={`circle `}
                style={{
                  background: `conic-gradient(${currentStyle})`,
                }}
              ></div>
              <div className="discretion">
                <h6>Reward Percentage </h6>
                <div className="list">
                  {coinArray.map(({ coin, percentage }, index) => {
                    if (!coin || !percentage) {
                      return <></>;
                    }
                    return (
                      <div key={index}>
                        {" "}
                        <span style={{ "--itemCol": colorArray[index] }}>
                          {coin}
                        </span>{" "}
                        <strong>{percentage}%</strong>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <>
              {coinArray.map(({ coin, percentage, maxCount }, index) => {
                return (
                  <div className="validate-input duel-input">
                    <div>
                      <input
                        className={`input2 ${coin ? "fill" : ""}`}
                        type="text"
                        value={coin || ""}
                        name="coin"
                        onChange={(e) => handleSetCoin(e, index)}
                      />
                      <span className="focus-input2">COIN</span>
                    </div>
                    <div>
                      <input
                        className={`input2 ${percentage ? "fill" : ""}`}
                        type="text"
                        value={percentage || ""}
                        name="percentage"
                        onChange={(e) => handleSetCoin(e, index)}
                      />
                      <span className="focus-input2">PERCENTAGE %</span>
                    </div>
                    <div>
                      <input
                        className={`input2 ${maxCount ? "fill" : ""}`}
                        type="text"
                        value={maxCount || ""}
                        name="maxCount"
                        onChange={(e) => handleSetCoin(e, index)}
                      />
                      <span className="focus-input2">MAX NUMBER</span>
                    </div>
                  </div>
                );
              })}
            </>

            <div className="validate-input add-more-section">
              <button
                onClick={() => {
                  setCoinArray((state) => {
                    return [
                      ...state,
                      { coin: "", percentage: "", maxCount: "" },
                    ];
                  });
                }}
              >
                <strong>+</strong> Add More
              </button>
            </div>

            <div className="container-contact2-form-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        activeTab === "daily-task-config" && (
          <div className="wrap-contact2">
            <form
              className="contact2-form validate-form"
              onSubmit={onConfigSubmit}
            >
              <span className="contact2-form-title">Set Daily Task Config</span>

              <div className="validate-input">
                <input
                  className={`input2 ${
                    configInput.maximumAmount ? "fill" : ""
                  }`}
                  type="text"
                  value={configInput.maximumAmount || ""}
                  name="maximumAmount"
                  onChange={handleConfigChange}
                />
                <span className="focus-input2">Max Amount</span>
              </div>
              <div className="validate-input">
                <input
                  className={`input2 ${
                    configInput.pointConvertAmount ? "fill" : ""
                  }`}
                  type="text"
                  value={configInput.pointConvertAmount || ""}
                  name="pointConvertAmount"
                  onChange={handleConfigChange}
                />
                <span className="focus-input2">Point Convert Amount</span>
              </div>
              <div className="validate-input">
                <input
                  className={`input2 ${configInput.taskNotice ? "fill" : ""}`}
                  type="text"
                  value={configInput.taskNotice || ""}
                  name="taskNotice"
                  onChange={handleConfigChange}
                />
                <span className="focus-input2">Task Notice</span>
              </div>
              <div className="validate-input">
                <input
                  className={`input2 ${
                    configInput.taskOffNotice ? "fill" : ""
                  }`}
                  type="text"
                  value={configInput.taskOffNotice || ""}
                  name="taskOffNotice"
                  onChange={handleConfigChange}
                />
                <span className="focus-input2">Task Off Notice</span>
              </div>
              <div className="validate-input calender-section">
                <span className="focus-input2">Task Off Start Date</span>
                <input
                  type="date"
                  value={configInput.taskStartDate || ""}
                  onChange={handleConfigChange}
                  name="taskStartDate"
                />
              </div>
              <div className="validate-input calender-section">
                <span className="focus-input2">Task Off Expire Date</span>
                <input
                  type="date"
                  value={configInput.taskExpireDate || ""}
                  onChange={handleConfigChange}
                  name="taskExpireDate"
                />
              </div>

              <div className="validate-input">
                <input
                  className={`input2 ${
                    configInput.tutorialVideoId ? "fill" : ""
                  }`}
                  type="text"
                  value={configInput.tutorialVideoId || ""}
                  name="tutorialVideoId"
                  onChange={handleConfigChange}
                />
                <span className="focus-input2">Tutorial Video ID</span>
              </div>

              <div className="container-contact2-form-btn">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default AdminAddDailyTask;
