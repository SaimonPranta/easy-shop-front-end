import React, { useContext, useEffect, useState } from 'react';
import processingHandle from '../../../../Functions/processingHandle';
import { getCooki } from '../../../../shared/cooki';
import OffsetController from '../../../../shared/components/OffsetController'

const PendingMobileRecharge = () => {
    const [allUser, setAllUser] = useState([])
    const [offset, setOffset] = useState(1)
    const [message, setMessage] = useState({})
    const [condition, setCondition] = useState({
        apporoval: false,
        processing: false
    })
    const [userCount, setUserCount] = useState({
        rechargeRequest: 0,
        totalAmount: 0,
    })
    const cookie = getCooki()

    let count = 0

    useEffect(() => {
        const cookie = getCooki()

        if (cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/recharge-request-list?page=${offset}&approve=${condition.apporoval}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
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
        if (cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/recharge-request`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.count) {
                        setUserCount(data.count)
                    }
                })
        }
    }, []);



    // useEffect(() => {
    //     if (allUser && allUser.length > 0) {
    //         totalPendingUser = 0;
    //         totalApprovalUser = 0
    //         totalPendingBalance = 0
    //         totalApprovalBalance = 0

    //         allUser.map((user) => {
    //             user.mobileRechareInfo.map((req) => {
    //                 const currentUserCount = { ...userCount }

    //                 totalPendingUser = !req.apporoval ? totalPendingUser + 1 : totalPendingUser
    //                 totalApprovalUser = req.apporoval ? totalApprovalUser + 1 : totalApprovalUser

    //                 totalPendingBalance = !req.apporoval ? totalPendingBalance + req.amount : totalPendingBalance
    //                 totalApprovalBalance = req.apporoval ? totalApprovalBalance + req.amount : totalApprovalBalance

    //                 currentUserCount["pending"] = totalPendingUser
    //                 currentUserCount["apporoval"] = totalApprovalUser
    //                 currentUserCount["pendipendingBalanceng"] = totalPendingBalance
    //                 currentUserCount["approvalBalance"] = totalApprovalBalance

    //                 setUserCount(currentUserCount)
    //                 return null
    //             })
    //         })
    //     }
    // }, [allUser]);

    const arroay = []
    allUser.map(info => {
        if (info.mobileRechareInfo.toString().length > 0) {
            info.mobileRechareInfo.map(items => {
                if (typeof items.amount === "string") {
                    arroay.push(info._id)
                }
            })
        }
    })

    const requestHandle = () => {
        const currentCondition = { ...condition }
        currentCondition.apporoval = currentCondition.apporoval ? currentCondition.apporoval = false : currentCondition.apporoval = true
        setCondition(currentCondition)
    };



    const mobileRechargeApproval = (e, id, requestID, amount) => {
        setMessage({})
        if (id && requestID && amount && !condition.processing) {
            processingHandle(condition, setCondition)

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/mobile_recharge_approval`, {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                    amount
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
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
    };

    const mobileRechargeDecline = (e, id, requestID) => {
        if (id && requestID) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/mobile_recharge_decline`, {
                method: "POST",
                body: JSON.stringify({
                    id,
                    requestID,
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
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
                    <h4>Pending Mobile Recharge</h4>
                    <p>Total Pending Mobile Recharge Request {userCount.rechargeRequest} </p>
                    <p>Total Pending Mobile Recharge Balance {userCount.totalAmount} Tk</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={requestHandle}>See Approved Request</button>
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
                                <th>Date</th>
                                <th colspan="2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.length > 0 && allUser.map((user) => {
                                    if (user.mobileRechareInfo.length > 0) {
                                        return user.mobileRechareInfo.map((reqestItem) => {
                                            count++
                                            return <tr>
                                                <td>{count}</td>
                                                <td>{user.firstName} {user.lastName}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{reqestItem.number}</td>
                                                <td>{reqestItem.simProvider}</td>
                                                <td>{reqestItem.amount}</td>
                                                <td>{reqestItem.date}</td>
                                                {
                                                    !reqestItem.apporoval && <> <td className='approved-ad'><button onClick={(e) => mobileRechargeApproval(e, user._id, reqestItem.requestID, reqestItem.amount)}>Approve</button></td>
                                                        <td className='pending-ad'><button onClick={(e) => mobileRechargeDecline(e, user._id, reqestItem.requestID)}>Decline</button></td> </>
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
                    <h4>Approved Mobile Recharge</h4>

                    <p>Total Approved Mobile Recharge Request {userCount.apporoval} </p>
                    <p>Total Approved Mobile Recharge Balance {userCount.approvalBalance} tk</p>

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
                                    if (user.mobileRechareInfo.length > 0) {
                                        return user.mobileRechareInfo.map((reqestItem) => {
                                            if (reqestItem.apporoval) {
                                                count++
                                                return <tr>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.simProvider}</td>
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

export default PendingMobileRecharge;