import React, { useEffect, useState } from 'react';
import "./style.scss"
import { FaCheck } from "react-icons/fa";
import LuckySpinner from './LuckySpinner/index'
import { shortText } from './utilities/index'

const taskImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCccyPZU6Ad7GmBlSCuxZp9OQuTHKyMb5_nQ&s"

const DailyTask = () => {
    const [dailyTasks, setDailyTasks] = useState([])
    const [seeMoreID, setSeeMoreID] = useState("")


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/get-daily-task`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("data from backend ===>>>", data)
                if (data.data) {
                    setDailyTasks(data.data)
                }
            })
    }, [])

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
                                            <span className='task-status '>
                                                <FaCheck />
                                            </span>
                                            <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${taskInfo?.currentTaskID?.img}`} alt='' />
                                        </div>
                                        <div className='description' >
                                            <p>{shortText(taskInfo?.currentTaskID?.description, 130, true)}</p>
                                            {/* <p>{taskInfo?.currentTaskID?.description}</p> */}
                                        </div>
                                    </div>
                                    <div className='action-section'>
                                        {
                                            seeMoreID !== index ? <div>
                                                <button onClick={() => setSeeMoreID(index)}>See More</button>
                                            </div> : seeMoreID === index ? <div>
                                                <button onClick={() => setSeeMoreID("")}>Close</button>
                                                <button>Go To Task</button>
                                            </div> : <div>
                                                <button>Close</button>
                                                <button className='complete'>Already Submit</button>
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