import React, { useState } from 'react';
import "./style.scss"
import { FaCheck } from "react-icons/fa";
import LuckySpinner from './LuckySpinner/index'

const taskImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCccyPZU6Ad7GmBlSCuxZp9OQuTHKyMb5_nQ&s"

const DailyTask = () => {
    const [seeMoreID, setSeeMoreID] = useState("")

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
                            new Array(5).fill().map((cont, index) => {
                                return <div className='task-item'>
                                    <div className='description-section'>
                                        <div className='img-section'>
                                            <span className='task-status '>
                                                <FaCheck />
                                            </span>
                                            <img src={taskImg} alt='' />
                                        </div>
                                        <div className='description' >
                                            <p>নিচের ইউটিউব চ্যানেল টি সাবস্ক্রাইব করুন তারপরে লাইক ও কমেন্ট করুন তারপরে ১ মিনিট ভিডিওটা দেখুন ১ মিনিট দেখা হলে ব্যাক চলে আসুন।</p>
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
                            <h5>অভিনন্দন</h5>
                            <p>আপনি ২০ টাকা টাক্স বোনাস পেয়েছেন।</p>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default DailyTask;