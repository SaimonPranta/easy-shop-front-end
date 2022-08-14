import React, { useContext, useEffect, useState } from 'react';
import dateFormater from '../../../../Functions/dateFormater';
import { allUserContext } from '../AdminPanelBody/AdminPanelBody';
import './PendingBalanceReq.css';
const PendingBalanceReq = () => {
    const [allUser, setAllUser] = useContext(allUserContext)
    const [currentUser, setCurrentUser] = useState([]);
    const [condition, setCondition] = useState({
        apporoval: false
    })
    const [userCount, setUserCount] = useState({
        pending: 0,
        apporoval: 0,
        pendingBalance: 0,
        approvalBalance: 0,

    })

    let totalPendingUser = 0
    let totalApprovalUser = 0
    let totalPendingBalance = 0
    let totalApprovalBalance = 0
    const cooki = document.cookie.split("=")[1];

    useEffect(() => {
        if (allUser && allUser.length > 0) {
            totalPendingUser = 0;
            totalApprovalUser = 0
            totalPendingBalance = 0
            totalApprovalBalance = 0

            allUser.map((user) => {
                user.balanceRequestInfo.map((req) => {
                    const currentUserCount = { ...userCount }

                    totalPendingUser = !req.apporoval ? totalPendingUser + 1 : totalPendingUser
                    totalApprovalUser = req.apporoval ? totalApprovalUser + 1 : totalApprovalUser

                    totalPendingBalance = !req.apporoval ? totalPendingBalance + req.amount : totalPendingBalance
                    totalApprovalBalance = req.apporoval ? totalApprovalBalance + req.amount : totalApprovalBalance

                    currentUserCount["pending"] = totalPendingUser
                    currentUserCount["apporoval"] = totalApprovalUser
                    currentUserCount["pendipendingBalanceng"] = totalPendingBalance
                    currentUserCount["approvalBalance"] = totalApprovalBalance

                    setUserCount(currentUserCount)
                    return null
                })
            })
        }
    }, [allUser]);

    let count = 0
    const requestHandle = () => {
        const currentCondition = { ...condition }
        currentCondition.apporoval = currentCondition.apporoval ? currentCondition.apporoval = false : currentCondition.apporoval = true
        setCondition(currentCondition)
    };



    const balanceRequestApproval = (e, id, requestID, amount) => {
        if (id && requestID, amount) {
            fetch("http://localhost:8000/blanace_approval", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                    amount
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        e.target.parentNode.style.display = "none"
                    }
                })
        }
    }

    const balanceRequestDecline = (e, id, requestID) => {
        if (id && requestID) {
            fetch("http://localhost:8000/balance_request_decline", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        e.target.parentNode.style.display = "none"
                    }

                })
        }
    };






    return (
        <>
            {
                !condition.apporoval && <div>
                    <h4>Pending Balance Request</h4>
                    <p>Total Pending Balance Request {userCount.pending} </p>
                    <p>Total Pending Balance {userCount.pendipendingBalanceng} Tk</p>

                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={requestHandle}>See Approved Request</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>User Number</th>
                                <th>Requested Number</th>
                                <th>Provider</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th colspan="2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.length > 0 && allUser.map((user) => {
                                    if (user.balanceRequestInfo.length > 0) {
                                        return user.balanceRequestInfo.map((reqestItem) => {
                                            if (!reqestItem.apporoval) {
                                                count++
                                                return <tr>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.provider}</td>
                                                    <td>{reqestItem.amount}</td>
                                                    <td>{dateFormater(reqestItem.date)}</td>
                                                    <td className='approved-ad'><button onClick={(e) => balanceRequestApproval(e, user._id, reqestItem.requestID, reqestItem.amount)}>Approved</button></td>
                                                    <td className='pending-ad'><button onClick={(e) => balanceRequestDecline(e, user._id, reqestItem.requestID)}>Pending</button></td>
                                                </tr>
                                            }
                                        })
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                condition.apporoval && <div>
                    <h4>Approved Balance Request</h4>

                    <p>Total Approved Balance Request {userCount.apporoval} </p>
                    <p>Total Approved Balance {userCount.approvalBalance} Tk</p>

                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={requestHandle}>See Pending Request</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>User Number</th>
                                <th>Requested Number</th>
                                <th>Provider</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.length > 0 && allUser.map((user) => {
                                    if (user.balanceRequestInfo.length > 0) {
                                        return user.balanceRequestInfo.map((reqestItem) => {
                                            if (reqestItem.apporoval) {
                                                count++
                                                return <tr>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.provider}</td>
                                                    <td>{reqestItem.amount}</td>
                                                    <td>{dateFormater(reqestItem.date)}</td>
                                                </tr>
                                            }
                                        })
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default PendingBalanceReq;