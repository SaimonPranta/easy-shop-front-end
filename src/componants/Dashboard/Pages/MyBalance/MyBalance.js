import React, { useContext, useEffect, useState } from 'react';
import './MyBalance.css';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { userContext } from '../../../../App';
import { Link } from 'react-router-dom';
import { getCooki } from '../../../../shared/cooki';
import welcomeImage from "../../../../assets/images/dashboard/abstract-welcome-composition-with-flat-design_23-2147912311.jpg"
import { FaShare, FaCopy } from "react-icons/fa"
import dollarImage from "../../../../assets/images/images.png"


const MyBalance = () => {
    const [user, setUser] = useContext(userContext);
    const [reqBalance, setReqBalance] = useState(0)
    const [withBalance, setWithBalance] = useState(0)
    const [notice, setNotice] = useState("")
    const [noticeInput, setNoticeInput] = useState("")
    const [message, setMessage] = useState({})
    const [condition, setCondition] = useState(false)


    const cooki = getCooki()
    console.log("user", user)

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
    const handleCopy = () => {
        const url = `${window.location.protocol}${window.location.host}/login?ref=${user.phoneNumber}`
        navigator.clipboard.writeText(url)
    }

    return (
        <section className='main-balance-container'>
            <div className=' m-auto'>
                <div className='title-container'><h4>Balance List</h4></div>
                <div className='info-container'>
                    <div>
                    <p>{`Name: ${user.firstName} ${user.lastName}`}</p>
                    <p>{`Account Number: ${user.phoneNumber}`}</p>
                    </div>
                </div>
                <div className='my-balance'>
                    <div>
                        <img src={dollarImage} alt='' />
                        <p>Main Balance</p>
                        <p className='tk'><span>৳</span> {user && user.balance}</p>
                    </div>
                    <div>
                        <img src={dollarImage} alt='' />

                        <p>Sale Balance</p>
                        <p className='tk'><span>৳</span> {user && user.salesBalance}</p>
                    </div>
                    <div>
                        <img src={dollarImage} alt='' />

                        <p>Task Balance</p>
                        <p className='tk'><span>৳</span> {user && user.taskBalance}</p>
                    </div>
                    {/* <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING BALANCE REQUEST</p>
                        <p className='tk'><span>৳</span> {reqBalance}</p>
                    </div> */}
                    {/* <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING WITHDRAW BALANCE REQUEST</p>
                        <p className='tk'><span>৳</span> {withBalance}</p>
                    </div> */}
                    {/* <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL INCOME BALANCE</p>
                        <p className='tk'><span>৳</span> {user.totalIncome}</p>
                    </div> */}
                </div>
            </div>
        </section >
    );
};

export default MyBalance;