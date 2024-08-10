import React, { useEffect, useState, useContext } from 'react';
import "./style.scss"
import { FaCheck } from "react-icons/fa";
import LuckySpinner from './LuckySpinner/index'
import { shortText } from './utilities/index'
import { getCooki } from '../../../../shared/cooki';
import { FcAddImage } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";
import SuccessTost from '../../../../shared/components/SuccessTost/SuccessTost'
import { ToastContainer } from 'react-toastify';
import { configContext, userContext } from '../../../../App';
import handleSpinReward from './utilities/hadleSpinReward';


const DailyTask = () => {
    const [dailyTasks, setDailyTasks] = useState([])
    const [seeMoreID, setSeeMoreID] = useState("")
    const [isAllCompleted, setIsAllCompleted] = useState(false)
    const [reRender, setRerender] = useState(false)
    const [images, setImages] = useState([])
    const [showSpin, setShowSpin] = useState(true)
    const [rewardAmount, setRewardAmount] = useState(null)
    const [config, setConfig] = useContext(configContext)
    const [user, setUser] = useContext(userContext)
    const cookie = getCooki()




    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/get-daily-task`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${cookie}`
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data?.data) {
                    setDailyTasks(data.data)
                }
                if (data?.isCompletedTask) {
                    setIsAllCompleted(data.data)
                }
            })
    }, [reRender])


    const handleGoToTask = async (taskInfo) => {
        try {
            window.open(taskInfo.currentTaskID.taskLink, '_blank');

            const currentList = [...dailyTasks]
            console.log('currentList =>', currentList)
            const updateTaskList = currentList.map((task) => {
                delete task["isGoToTask"]

                if (task._id.toString() === taskInfo._id.toString()) {
                    task["isGoToTask"] = true
                }

                return task
            })
            console.log('updateTaskList =>', updateTaskList)

            setDailyTasks(updateTaskList)
            setImages([])

        } catch (error) {
            console.log("error", error)
        }
    }
    const handleTaskSubmit = async (taskInfo) => {
        try {
            const formData = new FormData()

            images.forEach((image, index) => formData.append(`img${index + 1}`, image))
            formData.append("taskListID", taskInfo?._id)
            formData.append("dailyTaskID", taskInfo?.currentTaskID?._id)

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/create-user-history`, {
                method: "POST",
                body: formData,
                headers: {
                    authorization: `Bearer ${cookie}`
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.message) {
                        SuccessTost(data.message)
                    }
                    if (data.success) {
                        setRerender((state) => !state)
                    }

                })

        } catch (error) {
            console.log("error", error)
        }
    }

    const handleImgUpload = (e) => {
        if (images.length >= 8) {
            return
        }
        setImages((state) => {
            return [...state, e.target.files[0]]
        })
    }
    const handleRemoveImg = (img) => {
        const updateImages = images.filter((image) => image !== img)
        setImages(updateImages)
    }
    const handleSpinClick = () => {
        console.log("call handleSpinClick")
        console.log("config?.DailyTask?.taskRewardsList", config?.dailyTask?.taskRewardsList)
        if (!config?.dailyTask?.taskRewardsList?.length) {
            return
        }
        const { coin } = handleSpinReward(config?.dailyTask?.taskRewardsList || [])
        console.log("reward", coin)
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/set-user-points`, {
            method: "POST",
            body: JSON.stringify({ pointAmount: coin }),
            headers: {
                authorization: `Bearer ${cookie}`,
                // 'Content-type': 'application/json; charset=UTF-8',
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((data) => data.json())
            .then((data) => {
                setTimeout(() => {
                    if (data.success) {
                        setRewardAmount(coin)
                    }
                    if (data?.pointAmount) {
                        setUser((state) => {
                            return {
                                ...state,
                                pointAmount: (state?.pointAmount || 0) + data?.pointAmount
                            }
                        })
                    }
                }, 2000);

            })
    }

    console.log("user", user)

    return (
        <div className='daily-task'>
            <div className='main-container'>
                <div className='title-container'>
                    <h6>Daily Task</h6>
                </div>
                <div className='task-container'>
                    <div className='notification-container'>
                        <h5>ফেসবুক ইউটিউবে এবং টিকটকে লাইক ফলো ও সাবস্ক্রাইব নিতে 01936396595 এই নাম্বারে WhatsApp যোগাযোগ করবেন।</h5>

                    </div>
                    <div className='heading-section'>
                        <h3>আজকের ডেইলি টাক্স এর কাজ হলো  </h3>

                        <div className='maximum-figure'>
                            <span>{`বালেঞ্চ - ${user?.pointAmount || 0} পয়েন্ট`}</span>
                            <span>{`সর্বোচ্চ - ${config?.dailyTask?.maximumAmount || 0} পয়েন্ট`}</span>
                        </div>
                    </div>
                    {!showSpin && <div className='task-list'>
                        {
                            dailyTasks.map((taskInfo, index) => {
                                return <div className='task-item' key={index}>
                                    <div className='description-section'>
                                        <div className='img-section'>
                                            <span className={`task-status ${!taskInfo?.isTaskComplete ? "incomplete" : ""}`}>
                                                <FaCheck />
                                            </span>
                                            <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${taskInfo?.currentTaskID?.img}`} alt='' />
                                        </div>
                                        <div className='description' >
                                            {
                                                seeMoreID === index ? <p>{taskInfo?.currentTaskID?.description}</p> :
                                                    <p>{shortText(taskInfo?.currentTaskID?.description, 140, true)}</p>
                                            }

                                        </div>
                                    </div>

                                    {
                                        taskInfo?.isGoToTask && <div className='upload-section' >
                                            {images.length > 0 && <div className='upload-list'>
                                                {
                                                    images.map((item) => {
                                                        return <div className='img-container'>
                                                            <TiDeleteOutline onClick={() => handleRemoveImg(item)} />
                                                            <img src={URL.createObjectURL(item)} alt='' />
                                                        </div>
                                                    })
                                                }

                                            </div>}
                                            <div className='input-section'>
                                                <button>
                                                    <FcAddImage />
                                                </button>
                                                <input type='file' accept='image/*' onChange={handleImgUpload} />

                                            </div>
                                        </div>
                                    }
                                    <div className='action-section'>
                                        {
                                            seeMoreID !== taskInfo?._id ? <div>
                                                <button onClick={() => setSeeMoreID(taskInfo._id)}>See More</button>
                                            </div> : <div>
                                                {
                                                    isAllCompleted ? <>
                                                        <button onClick={() => setSeeMoreID("")} >Close</button>
                                                        <button onClick={() => setShowSpin(true)} >Go To Spin</button>
                                                    </>
                                                        :
                                                        taskInfo?.isGoToTask ? <>
                                                            <button onClick={() => setSeeMoreID("")} >Close</button>
                                                            <button onClick={() => handleTaskSubmit(taskInfo)} >Task Submit</button>
                                                        </> : taskInfo?.isTaskComplete ? <>
                                                            <button onClick={() => setSeeMoreID("")} >Close</button>
                                                            <button className='complete'>Already Submit</button>
                                                        </> : <>
                                                            <button onClick={() => setSeeMoreID("")}>Close</button>
                                                            <button onClick={() => handleGoToTask(taskInfo)} >Go To Task</button>
                                                        </>
                                                }
                                            </div>
                                        }


                                    </div>
                                </div>
                            })
                        }
                    </div>}
                    {showSpin && <div className='spinner-section'>
                        <LuckySpinner handleSpinClick={handleSpinClick} />
                        {rewardAmount && <div className='congress-section'>
                            <h5>অভিনন্দন 🎉</h5>
                            <p>{`আপনি ${rewardAmount} টাকা টাক্স বোনাস পেয়েছেন।`}</p>
                        </div>}
                    </div>}

                </div>



            </div>
            <ToastContainer />

        </div>
    );
};

export default DailyTask;