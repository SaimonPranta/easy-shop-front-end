import React, { useEffect, useState } from 'react';
import "./style.scss"
import AddNotification from './Modal/AddNoticationForm/AddNoticationForm';
import { getCooki } from '../../../shared/cooki';
import FailedTost from "../../../shared/components/FailedTost/FailedTost"
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost"
import { ToastContainer } from 'react-toastify';
import { FaEye, FaUserCheck, FaUserClock, FaUserShield, FaUsers } from 'react-icons/fa';
import { dateToString } from "../../../shared/functions/dateConverter"
import UserListContainer from './Modal/UserList/UserList';



const AdminHelpLine = () => {
    const [showModal, setShowModal] = useState(false)
    const [notificationList, setNotificationList] = useState([])
    const [userList, setUserList] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/notification`, {
            method: "GET",
            headers: {
                // 'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`

            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotificationList(data.data)
                }
                if (data.massage) {
                    FailedTost(data.massage)
                }

            })
    }, [])
    const handleDeleteNotification = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/notification?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`
            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotificationList((state) => {
                        const currentState = state.filter((info) => {
                            if (info._id === id) {
                                return false
                            } else {
                                return true
                            }
                        })
                        return [...currentState]
                    })
                }
                console.log("data ==>>", data)
                if (data.message) {
                    if (data.success) {
                        SuccessTost(data.message)
                    } else {
                        FailedTost(data.message)
                    }
                }

            })
    }
    console.log("userList ==>>", userList)
    const handleAddNotification = (e, input) => {
        e.preventDefault()
        console.log("input -->>", input)

        if (
            !input.description
        ) {
            return
        }
        const fromData = new FormData()
        if (input.img) {
            fromData.append("img", input.img)
        }
        fromData.append("data", JSON.stringify(input))
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/notification`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${getCooki()}`
            }, body: fromData
        }).then(res => res.json())
            .then(data => {

                if (data.data) {
                    setNotificationList((state) => {
                        return [...state, data.data]
                    })
                    setShowModal(false)
                }
                if (data.message) {
                    FailedTost(data.massage)
                }
            })
    }

    return (
        <div className='admin-help-line'>
            <div className='add-btn-container'>
                <button onClick={() => setShowModal(true)}>Add Notification</button>
            </div>
            <div className='social-media-list'>
                <div className='list-section'>
                    {
                        notificationList.map((notice, index) => {
                            console.log("selectedUser ==>", notice.selectedUser)
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
                                {
                                    notice.activeUser && notice.nonActiveUser ? <button className='see-user'><FaUsers /> All User</button> : notice.activeUser ? <button className='see-user'><FaUserShield /> Active User</button> : notice.nonActiveUser ? <button className='see-user'><FaUserClock /> Non Active User</button> : notice?.selectedUser?.length > 0 && <button className='see-user' onClick={() => {
                                        setUserList(notice.selectedUser)
                                        setTitle(notice.title)
                                    }}><FaEye /> See User </button>

                                }
                                {/* {
                                    notice?.selectedUser?.length > 0 && <button className='see-user' onClick={() => { 
                                        setUserList(notice.selectedUser)
                                         setTitle(notice.title) 
                                        }}><FaEye /> See User </button>
                                } */}
                                {/* {
                                    notice?.selectedUser?.length > 0 && <button className='see-user' onClick={() => { 
                                        setUserList(notice.selectedUser)
                                         setTitle(notice.title) 
                                        }}><FaEye /> See User </button>
                                } */}

                                <div className='date-container'>
                                    <p> CreateAt: {dateToString(notice.createdAt)}</p>
                                    {
                                        notice.expireTime && <p> ExpiredAt: {dateToString(notice.expireTime)}</p>
                                    }

                                </div>
                                <div className='action-btn-container'><button onClick={() => handleDeleteNotification(notice._id)}>Delete</button></div>
                            </div>
                        })
                    }
                </div>
            </div>
            <AddNotification showModal={showModal} setShowModal={setShowModal} onSubmit={handleAddNotification} />
            {
                userList?.length > 0 && <UserListContainer title={title} listItems={userList} setUserList={setUserList} />
            }

            <ToastContainer />


        </div >
    );
};

export default AdminHelpLine;