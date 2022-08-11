import React, { useContext, useEffect, useState } from 'react';
import './DashboardBody.css';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { userContext } from '../../../../App';
import { Link } from 'react-router-dom';




const DashboardBody = () => {
    const [user, setUser] = useContext(userContext);
    const [reqBalance, setReqBalance] = useState(0)
    const [withBalance, setWithBalance] = useState(0)
    const cooki = document.cookie.split("=")[1];


    let totalPendingBalance = 0
    let totalPendingWithdraw = 0


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


    const activeHandler = () => {
        if (user._id) {
            fetch(`http://localhost:8000/activation?id=${user._id}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.data) {
                        setUser(data)
                    }
                })
        }
    }



    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>USER DASHBOARD</h4>
                <div className='text-black withdraw-notice notice-section'>
                    <marquee>আসসালামু আলাইকুম Easy Shop 50 কোম্পানির পক্ষ থেকে আপনাদের জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন</marquee>
                </div>
                <div className='dashboard-user-info'>
                    <h5>Welcome</h5>
                    <p>{user && user.firstName + " " + user.lastName}</p>
                    <h5>{user && user.firstName + " " + user.lastName} {user.isActive ? "Your account is activated, you can start work now." : "Your account is not activate, you can't start work now."}</h5>
                    {
                        !user.isActive && user.balance < 50 ? <div class="btn-group p-0" role="group" aria-label="Basic example">
                            <Link to="/balance_request" type="button" class="btn btn-primary">Balance Request Now</Link>
                        </div> : null
                    }
                    {
                        !user.isActive && user.balance >= 50 ? <div class="btn-group p-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary" onClick={activeHandler}>Active Now</button>
                        </div> : null
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
                        <p> {user && user.totalIncome}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>SHOPPING BALANCE</p>
                        <p> {user && user.shoppingBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING BALANCE REQUEST</p>
                        <p> {reqBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING WITHDRAW BALANCE REQUEST</p>
                        <p> {withBalance}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;