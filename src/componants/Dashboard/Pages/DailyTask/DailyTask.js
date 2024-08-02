import React, { useEffect, useState } from 'react';
import "./style.scss"
import { FaCheck } from "react-icons/fa";
import LuckySpinner from './LuckySpinner/index'
import { shortText } from './utilities/index'
import { getCooki } from '../../../../shared/cooki';
import { FcAddImage } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";


const DailyTask = () => {
    const [dailyTasks, setDailyTasks] = useState([])
    const [seeMoreID, setSeeMoreID] = useState("")
    const [images, setImages] = useState([])
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
                if (data.data) {
                    setDailyTasks(data.data)
                }
            })
    }, [])

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
            window.open(taskInfo.currentTaskID.taskLink, '_blank');

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/create-user-history`, {
                method: "POST",
                body: JSON.stringify({
                    taskListID: taskInfo?._id,
                    dailyTaskID: taskInfo?.currentTaskID?._id,
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.taskListID) {
                        const currentList = [...dailyTasks]
                        console.log('currentList =>', currentList)
                        const updateTaskList = currentList.map((task) => {
                            console.log("ask._id.toString()", task._id.toString())
                            console.log("data.taskListID.toString()", data.taskListID.toString())

                            if (task._id.toString() === data.taskListID.toString()) {
                                task.isTaskComplete = true
                            }

                            return task
                        })
                        console.log('updateTaskList =>', updateTaskList)

                        setDailyTasks(updateTaskList)
                    }
                })

        } catch (error) {
            console.log("error", error)
        }
    }

    const handleImgUpload = (e) => {
        setImages((state) => {
            return [...state, e.target.files[0]]
        })
    }
    const handleRemoveImg = (img) => {
        const updateImages = images.filter((image) => image !== img)
        setImages(updateImages)
    }

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
                            <span>সর্বোচ্চ - ৳99</span>
                        </div>
                    </div>
                    <div className='task-list'>
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
                                                    taskInfo?.isGoToTask ? <>
                                                        <button onClick={() => setSeeMoreID("")} >Close</button>
                                                        <button className='complete'>Task Submit</button>
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
                    </div>
                    <div className='spinner-section'>
                        <LuckySpinner />
                        <div className='congress-section'>
                            <h5>অভিনন্দন 🎉</h5>
                            <p>আপনি ২০ টাকা টাক্স বোনাস পেয়েছেন।</p>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default DailyTask;