import React, { useContext, useEffect, useState } from 'react';
import './DashboardBody.css';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { userContext } from '../../../../App';
import { Link } from 'react-router-dom';
import { getCooki } from '../../../../shared/cooki';




const DashboardBody = () => {
    const [user, setUser] = useContext(userContext);
    const [reqBalance, setReqBalance] = useState(0)
    const [withBalance, setWithBalance] = useState(0)
    const [notice, setNotice] = useState("")
    const [noticeInput, setNoticeInput] = useState("")
    const [message, setMessage] = useState({})
    const [condition, setCondition] = useState(false)


    const cooki = getCooki()


    let totalPendingBalance = 0
    let totalPendingWithdraw = 0

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/notice`)
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotice(data.data)
                }
            })
    }, [])


    useEffect(() => {
        if (user.balanceRequestInfo.length > 0) {
            totalPendingBalance = 0
            user.balanceRequestInfo.map((req) => {
                if (!req.apporoval) {
                    totalPendingBalance = totalPendingBalance + Math.floor(req.amount)
                    setReqBalance(totalPendingBalance)
                }
            })
        }
        if (user.withdrawInfo.length > 0) {
            totalPendingWithdraw = 0
            user.withdrawInfo.map((req) => {
                if (!req.apporoval) {
                    totalPendingWithdraw = totalPendingWithdraw + Math.floor(req.amount)
                    setWithBalance(totalPendingWithdraw)
                }
            })
        }
    }, [])

    const addNotice = (e) => {
        e.preventDefault()
        if (noticeInput) {
            setNoticeInput("   ")
        }
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/notice`, {
            method: "POST",
            body: JSON.stringify({ notice: noticeInput ? noticeInput : " " }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${cooki}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    setNotice(data.data)
                } else {
                    setMessage({ failed: data.failed })
                }

            })
    }


    const activeHandler = () => {
        if (user._id && !condition) {
            setCondition(true)
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/activation?id=${user._id}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.data) {
                        setUser(data.data)
                    }
                })
        }
    }



    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>USER DASHBOARD</h4>
                {
                    notice && <div className='text-black withdraw-notice notice-section'>
                        <marquee>{notice}</marquee>
                    </div>

                }
                {
                    user && user.role === "admin" && <>
                        <div className='text-black withdraw-notice notice-section'>
                            <input type="text" className="form-control m-auto" aria-label="Text input with radio button" onChange={(e) => setNoticeInput(e.target.value)} value={noticeInput} placeholder="Type notice here..." />

                            <div className='d-flex'>
                                <button type="button" onClick={addNotice} className="btn btn-primary btn m-auto">Submit Notice</button>
                            </div>
                        </div>
                        <div className='resposeContainer' >
                            {
                                !message.failed && message.sucess && <p className='sucess'>{message.sucess}</p>
                            }
                            {
                                !message.sucess && message.failed && <p className='warning'>{message.failed}</p>
                            }
                        </div>
                    </>
                }
                <div className='dashboard-user-info'>
                    <h5>Welcome</h5>
                    <p>{user && user.firstName + " " + user.lastName}</p>
                    <h5>{user && user.firstName + " " + user.lastName} {user.isActive ? "Your account is activated, you can start work now." : "Your account is not activate, you can't start work now."}</h5>
                    {
                        !user.isActive && user.balance < 50 ? <sapn className="btn-group p-0 m-auto  dashbord-active-btn" role="group" aria-label="Basic example">
                            <Link to="/balance_request" type="button" className="btn btn-primary">Balance Request Now</Link>
                        </sapn> : null
                    }
                    {
                        !user.isActive && user.balance >= 50 ? <sapn className="btn-group p-0 m-auto dashbord-active-btn" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={activeHandler}>Active Now</button>
                        </sapn> : null
                    }
                    <div>
                        <p>{user && user.firstName + " " + user.lastName}</p>
                    </div>
                    <div>
                        <p>Phone Number: {user && user.phoneNumber}</p>
                    </div>
                </div>

                <div className='balnce-section text-center dashboard-sub-section'>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>INCOME BALANCE</p>
                        <p className='tk'><span>৳</span> {user && user.balance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>SHOPPING BALANCE</p>
                        <p className='tk'><span>৳</span> {user && user.shoppingBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING BALANCE REQUEST</p>
                        <p className='tk'><span>৳</span> {reqBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING WITHDRAW BALANCE REQUEST</p>
                        <p className='tk'><span>৳</span> {withBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL INCOME BALANCE</p>
                        <p className='tk'><span>৳</span> {user.totalIncome}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardBody;