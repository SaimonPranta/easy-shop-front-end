import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import { FaCheck } from "react-icons/fa";
import LuckySpinner from "./LuckySpinner/index";
import { shortText } from "./utilities/index";
import { getCooki } from "../../../../shared/cooki";
import { TiDeleteOutline, TiVideo } from "react-icons/ti";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { configContext, userContext } from "../../../../App";
import handleSpinReward from "./utilities/hadleSpinReward";

const DailyTask = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [seeMoreID, setSeeMoreID] = useState("");
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [disableSpin, setDisableSpin] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [images, setImages] = useState([]);
  const [spinPointHistory, setPinPointHistory] = useState([]);
  const [taskRewardsList, setTaskRewardsList] = useState([]);
  const [showSpin, setShowSpin] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [config] = useContext(configContext);
  const [user, setUser] = useContext(userContext);
  const cookie = getCooki();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/get-daily-task`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data?.data) {
          setDailyTasks(data.data);
        }
        if (data?.isCompletedTask) {
          setIsAllCompleted(data.data);
        }
      });
  }, [reRender]);

  useEffect(() => {
    if (config?.dailyTask?.taskRewardsList?.length) {
      const filterTaskRewardList = config?.dailyTask?.taskRewardsList.filter(
        (info) => {
          if (info?.maxCount) {
            const spinPoint = spinPointHistory.find((spinInfo) => {
              if (spinInfo?.pointAmount === info?.coin) {
                return true;
              }
              return false;
            });
            if (spinPoint?.count <= info.maxCount) {
              return false;
            }
          }
          return true;
        }
      );
      setTaskRewardsList(filterTaskRewardList);
    }
  }, [config?.dailyTask?.taskRewardsList, spinPointHistory]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/spin-info`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data?.data) {
          setPinPointHistory(data?.data?.spinPointHistory);
          setDisableSpin(data?.data?.disableSpin);
        }
      });
  }, []);

  const handleGoToTask = async (taskInfo) => {
    try {
      window.open(taskInfo.currentTaskID.taskLink, "_blank");

      const currentList = [...dailyTasks];
      const updateTaskList = currentList.map((task) => {
        delete task["isGoToTask"];

        if (task._id.toString() === taskInfo._id.toString()) {
          task["isGoToTask"] = true;
        }

        return task;
      });

      setDailyTasks(updateTaskList);
      setImages([]);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleTutorial = async (taskInfo) => {
    try {
      window.open(taskInfo.currentTaskID.tutorialLink, "_blank");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleTaskSubmit = async (taskInfo) => {
    try {
      const formData = new FormData();
      if (!images.length) {
        FailedTost("Task prove Image are required");

        return;
      }
      images.forEach((image, index) =>
        formData.append(`img${index + 1}`, image)
      );
      formData.append("taskListID", taskInfo?._id);
      formData.append("dailyTaskID", taskInfo?.currentTaskID?._id);
      setIsButtonDisable(true);
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/create-user-history`,
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${cookie}`,
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.message) {
            SuccessTost(data.message);
          }
          if (data.success) {
            setRerender((state) => !state);
          }
        })
        .finally(() => {
          setIsButtonDisable(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImgUpload = (e) => {
    if (images.length >= 8) {
      FailedTost("You can't upload more than eight image");
      return;
    }
    setImages((state) => {
      return [...state, e.target.files[0]];
    });
  };
  const handleRemoveImg = (img) => {
    const updateImages = images.filter((image) => image !== img);
    setImages(updateImages);
  };
  const handleSpinClick = () => {
    if (!taskRewardsList?.length) {
      return;
    }
    const { coin } = handleSpinReward(taskRewardsList);
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/set-user-points`,
      {
        method: "POST",
        body: JSON.stringify({ pointAmount: coin }),
        headers: {
          authorization: `Bearer ${cookie}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setTimeout(() => {
          if (data.success) {
            setRewardAmount(coin);
            setDisableSpin(true);
          }
          if (data?.pointAmount) {
            setUser((state) => {
              return {
                ...state,
                pointAmount: data?.pointAmount || 0,
              };
            });
          }
        }, 2000);
      });
  };

  return (
    <div className="daily-task">
      <div className="main-container">
        <div className="title-container">
          <h6>Daily Task</h6>
        </div>

        <div className="task-container">
          {config?.dailyTask?.taskNotice && (
            <div className="notification-container">
              <h5>{config?.dailyTask?.taskNotice}</h5>
            </div>
          )}
          <div className="heading-section">
            <h3>আজকের ডেইলি টাক্স এর কাজ হলো </h3>

            <div className="maximum-figure">
              <span>{`ব্যালেন্স - ${user?.pointAmount || 0} পয়েন্ট`}</span>
              <span>{`সর্বোচ্চ - ${
                config?.dailyTask?.maximumAmount || 0
              } পয়েন্ট`}</span>
            </div>
          </div>
          {!showSpin && (
            <div className="task-list">
              {dailyTasks.map((taskInfo, index) => {
                return (
                  <div className="task-item" key={index}>
                    <div className="description-section">
                      <div className="img-section">
                        <span
                          className={`task-status ${
                            !taskInfo?.isTaskComplete ? "incomplete" : ""
                          }`}
                        >
                          <FaCheck />
                        </span>
                        <img
                          src={`${process.env.REACT_APP_SERVER_HOST_URL}/${taskInfo?.currentTaskID?.img}`}
                          alt=""
                        />
                      </div>
                      <div className="description">
                        {seeMoreID === index ? (
                          <p>{taskInfo?.currentTaskID?.description}</p>
                        ) : (
                          <p>
                            {shortText(
                              taskInfo?.currentTaskID?.description,
                              140,
                              true
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {taskInfo?.isGoToTask && (
                      <div className="upload-section">
                        {images.length > 0 && (
                          <div className="upload-list">
                            {images.map((item) => {
                              return (
                                <div className="img-container">
                                  <TiDeleteOutline
                                    onClick={() => handleRemoveImg(item)}
                                  />
                                  <img src={URL.createObjectURL(item)} alt="" />
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div className="upload-section">
                          <label>
                            {/* <FcAddImage /> */}
                            আজকের কাজের স্ক্রীনশর্ট আপলোড করুন
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImgUpload}
                          />
                        </div>
                      </div>
                    )}
                    <div className="action-section">
                      {seeMoreID !== taskInfo?._id ? (
                        <div>
                          <button
                            onClick={() => {
                              if (!user.isActive) {
                                FailedTost(
                                  "Sorry, Your account is not activated yet"
                                );
                                return;
                              }
                              let disableStartDate = null;
                              let disableEndDate = null;
                              if (config?.dailyTask?.taskStartDate) {
                                disableStartDate = new Date(
                                  config?.dailyTask?.taskStartDate
                                );
                              }
                              if (config?.dailyTask?.taskExpireDate) {
                                disableEndDate = new Date(
                                  config?.dailyTask?.taskExpireDate
                                );
                              }

                              if (
                                disableStartDate &&
                                disableEndDate &&
                                disableStartDate < new Date() &&
                                disableEndDate > new Date()
                              ) {
                                FailedTost(
                                  config?.dailyTask?.taskOffNotice ||
                                    "Today daily task section holiday"
                                );
                                return;
                              }
                              setSeeMoreID(taskInfo._id);
                            }}
                          >
                            See More
                          </button>
                        </div>
                      ) : (
                        <div>
                          {isAllCompleted ? (
                            <>
                              <button onClick={() => setSeeMoreID("")}>
                                Close
                              </button>
                              <button onClick={() => setShowSpin(true)}>
                                Go To Spin
                              </button>
                            </>
                          ) : taskInfo?.isGoToTask ? (
                            <>
                              <button onClick={() => setSeeMoreID("")}>
                                Close
                              </button>
                              <button
                                disabled={isButtonDisable}
                                onClick={() => handleTaskSubmit(taskInfo)}
                              >
                                Task Submit
                              </button>
                            </>
                          ) : taskInfo?.isTaskComplete ? (
                            <>
                              <button onClick={() => setSeeMoreID("")}>
                                Close
                              </button>
                              <button className="complete">
                                Already Submit
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setSeeMoreID("")}>
                                Close
                              </button>
                              <button onClick={() => handleGoToTask(taskInfo)}>
                                Go To Task
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {taskInfo?.currentTaskID?.tutorialLink && (
                        <div className="tutorial-btn">
                          <button onClick={() => handleTutorial(taskInfo)}>
                            <TiVideo />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {showSpin && (
            <div className="spinner-section">
              <LuckySpinner
                handleSpinClick={handleSpinClick}
                disableSpin={disableSpin}
              />
              {rewardAmount && (
                <div className="congress-section">
                  <h5>অভিনন্দন 🎉</h5>
                  <p>{`আপনি ${rewardAmount} পয়েন্ট টাক্স বোনাস পেয়েছেন।`}</p>
                </div>
              )}
            </div>
          )}
          {/* {true && <div className='spinner-section'>
                        <LuckySpinner handleSpinClick={handleSpinClick} disableSpin={disableSpin} />
                        {true && <div className='congress-section'>
                            <h5>অভিনন্দন 🎉</h5>
                            <p>{`আপনি ${rewardAmount} টাকা টাক্স বোনাস পেয়েছেন।`}</p>
                        </div>}
                    </div>} */}

          {config?.dailyTask?.tutorialVideoId && (
            <div className="main-tutorial-section">
              <div className="title-section">
                <h3>Tutorial</h3>

                <p>ডেইলি টাক্স কিভাবে কমপ্লিট করবেন || ভিডিও দেখুন।</p>
              </div>
              <div className="frame-container">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${config?.dailyTask?.tutorialVideoId}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DailyTask;
