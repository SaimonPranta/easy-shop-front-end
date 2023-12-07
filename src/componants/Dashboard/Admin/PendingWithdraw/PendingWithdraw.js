import React, { useContext, useEffect, useState } from 'react';
import processingHandle from '../../../../Functions/processingHandle';
import { getCooki } from '../../../../shared/cooki';
import OffsetController from '../../../../shared/components/OffsetController'

const PendingWithdraw = () => {
    const [allUser, setAllUser] = useState([])
    const [offset, setOffset] = useState(1)
    const [message, setMessage] = useState({})
    const [condition, setCondition] = useState({
        apporoval: false,
        processing: false
    })
    const [userCount, setUserCount] = useState({
        withdrawRequest: 0,
        totalAmount: 0,

    })

    const Cookie = getCooki()



    useEffect(() => { 
        if (Cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/withdraw-request-list?page=${offset}&approve=${condition.apporoval}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${Cookie}`
                }
            }).then(res => res.json())
                .then(data => {
                    console.log("data", data)
                    //setCount(data.count)
                    if (data.users) {
                        setAllUser(data.users)
                    }
                })
        }
    }, [offset, condition.apporoval]);




    useEffect(() => {
        if (Cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/withdraw-request`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${Cookie}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.count) {
                        setUserCount(data.count)
                    }
                })
        }
    }, []);

    let count = 0
    const requestHandle = () => {
        const currentCondition = { ...condition }
        currentCondition.apporoval = currentCondition.apporoval ? currentCondition.apporoval = false : currentCondition.apporoval = true
        setCondition(currentCondition)
    };



    const withdrawRequestApproval = (e, id, requestID, amount) => {
        setMessage({})
        if (id && requestID && amount && !condition.processing) {
            processingHandle(condition, setCondition)

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw_request_approval`, {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                    amount
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${Cookie}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        setMessage({})
                        e.target.parentNode.parentNode.style.display = "none"
                    }
                    if (data.failed) {
                        setMessage({ failed: data.failed })
                        setTimeout(() => {
                            setMessage({})
                        }, 7000);
                    }
                })
        }
    }


    const withdrawRequestDecline = (e, id, requestID) => {
        if (id && requestID) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw_request_decline`, {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${Cookie}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        e.target.parentNode.parentNode.style.display = "none"
                    }

                })
        }
    };


    return (
        <>
            {
                <div>
                    <h4>Pending Withdraw Request</h4>
                    <p>Total Pending Withdraw Request {userCount.withdrawRequest} </p>
                    <p>Total Pending Withdraw Balance {userCount.totalAmount} Tk</p>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={requestHandle}>See Approved Request</button>
                    </div>
                    <div>
                        <p style={{ color: "yellow" }}>{message.failed ? message.failed : null}</p>
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
                                <th>Status</th>
                                <th>Date</th>
                                <th colSpan="2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.length > 0 && allUser.map((user) => {
                                    if (user.withdrawInfo.length > 0) {
                                        return user.withdrawInfo.map((reqestItem) => {
                                            if (reqestItem.apporoval !== condition.apporoval) {
                                                return <></>
                                            }
                                            count++
                                            return <tr key={count}>
                                                <td>{count}</td>
                                                <td>{user.firstName} {user.lastName}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{reqestItem.number}</td>
                                                <td>{reqestItem.porvider}</td>
                                                <td>{reqestItem.amount}</td>
                                                <td>{reqestItem.apporoval ? "Approve" : "Not Approve"}</td>
                                                <td>{reqestItem.date}</td>
                                                {
                                                    !reqestItem.apporoval && <>
                                                        <td className="approved-ad" > <button onClick={(e) => withdrawRequestApproval(e, user._id, reqestItem.requestID, reqestItem.amount)}>Approve</button></td>
                                                        <td className="pending-ad" > <button onClick={(e) => withdrawRequestDecline(e, user._id, reqestItem.requestID)}>Decline</button></td>
                                                    </>
                                                }

                                            </tr>
                                        })
                                    }
                                })
                            }
                        </tbody>
                    </table>

                    <OffsetController offset={offset} setOffset={setOffset} />
                </div>
            }
            {/* {
                condition.apporoval && <div>
                    <h4>Approved Withdraw Request</h4>

                    <p>Total Approved Withdraw Balance Request {userCount.apporoval} </p>
                    <p>Total Approved Withdraw Balance {userCount.approvalBalance} Tk</p>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={requestHandle}>See Pending Request</button>
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
                                    if (user.withdrawInfo.length > 0) {
                                        return user.withdrawInfo.map((reqestItem) => {
                                            if (reqestItem.apporoval) {
                                                count++
                                                return <tr key={count}>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.porvider}</td>
                                                    <td>{reqestItem.amount}</td>
                                                    <td>{reqestItem.date}</td>
                                                </tr>
                                            }
                                        })
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } */}
        </>
    );
};

export default PendingWithdraw;