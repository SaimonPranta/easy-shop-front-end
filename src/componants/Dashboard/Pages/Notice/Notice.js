import React, { useEffect, useState } from 'react';
import "./style.scss"
import { getCooki } from '../../../../shared/cooki';

 

const Notice = () => {
    const [notificationList, setNotificationList] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/notification`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`

            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotificationList(data.data)
                }
                if (data.massage) {
                    // FailedTost(data.massage)
                }

            })
    }, [])

    return (
        <div className='notice-section'>
            <div className='title-container'>
                <h4>Notice</h4>
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
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Notice;