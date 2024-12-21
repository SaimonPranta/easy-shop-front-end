import React, { useEffect, useState } from 'react';
import "./style.scss"
import {  userHeader } from '../../../../shared/cooki';
import { dateToString } from '../../../../shared/functions/dateConverter';

 

const Notice = () => {
    const [notificationList, setNotificationList] = useState([])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/notification`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                ...userHeader()

            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotificationList(data.data)
                    localStorage.setItem("seenNotificationCount",data.data.length);
                }
                if (data.massage) {
                    // FailedTost(data.massage)
                }

            })
    }, [])

    return (
        <div className='notice-section'>
            <div className='title-container'>
                <h4>Notification</h4>
            </div>

            <div className='list-section'>
                {
                    notificationList.map((notice, index) => { 
                        return <div className='notice-cart' key={index}>
                            {
                                    notice.img && <img src={process.env.REACT_APP_SERVER_HOST_URL + "/" + notice.img} alt='' />
                            }
                            {
                                notice.title && <h6>{notice.title}</h6>
                            }
                            {
                                notice.description && <p>{notice.description}</p>
                            }
                            <span>Date: {dateToString(notice.createdAt)}</span>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Notice;