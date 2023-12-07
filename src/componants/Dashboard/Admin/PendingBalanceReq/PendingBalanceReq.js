import React, { useContext, useEffect, useState } from 'react'; 
import './PendingBalanceReq.css';
import processingHandle from '../../../../Functions/processingHandle';
import { getCooki } from '../../../../shared/cooki';
import OffsetController from '../../../../shared/components/OffsetController'

const PendingBalanceReq = () => {
    const [allUser, setAllUser] = useState([])
    const [offset, setOffset] = useState(1)
    const [condition, setCondition] = useState({
        apporoval: false,
        processing: false
    })
    const [userCount, setUserCount] = useState({
        balanceRequest: 0,
        totalAmount: 0, 

    })


    const cookie = getCooki()


    useEffect(() => { 

        if (cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/balance-request`, {
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



    useEffect(() => { 
        if (cookie) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/balance-request-list?page=${offset}&approve=${condition.apporoval}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cookie}`
                }
            }).then(res => res.json())
                .then(data => { 
                    console.log("data", data)
                    if (data.users) {
                        setAllUser(data.users)
                    }
                })
        }
    }, [offset, condition.apporoval]);


    // useEffect(() => {
    //     if (allUser && allUser.length > 0) {
    //         totalPendingUser = 0;
    //         totalApprovalUser = 0
    //         totalPendingBalance = 0
    //         totalApprovalBalance = 0

    //         allUser.map((user) => {
    //             user.balanceRequestInfo.map((req) => {
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

    let count = 0
    const requestHandle = () => {
        const currentCondition = { ...condition }
        currentCondition.apporoval = currentCondition.apporoval ? currentCondition.apporoval = false : currentCondition.apporoval = true
        setCondition(currentCondition)
    };



    const balanceRequestApproval = (e, id, requestID, amount) => {
        if (id && requestID && amount && !condition.processing) {
            processingHandle(condition, setCondition)

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/blanace_approval`, {
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
                        e.target.parentNode.parentNode.style.display = "none"
                    }
                })
        }
    }

    const balanceRequestDecline = (e, id, requestID) => {

        if (id && requestID) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/balance_request_decline`, {
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

    console.log("userList", allUser)


    return (
        <>
            {
                <div>
                    <h4>Pending Balance Request</h4>
                    <p>Total Pending Balance Request {userCount.balanceRequest} </p>
                    <p>Total Pending Balance {userCount.totalAmount} Tk</p>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={requestHandle}>See Approved Request</button>
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
                                <th colSpan="2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.length > 0 && allUser.map((user) => {
                                    if (user.balanceRequestInfo.length > 0) {
                                        return user.balanceRequestInfo.map((requestItem) => {
                                            if (requestItem.apporoval !== condition.apporoval) {
                                                return <></>
                                            }
                                            count++
                                            return <tr key={count}>
                                                <td>{count}</td>
                                                <td>{user.firstName} {user.lastName}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{requestItem.number}</td>
                                                <td>{requestItem.provider}</td>
                                                <td>{requestItem.amount}</td>
                                                <td>{requestItem.date}</td>
                                                {
                                                    !requestItem.apporoval && <> <td className='approved-ad'><button onClick={(e) => balanceRequestApproval(e, user._id, requestItem.requestID, requestItem.amount)}>Approved</button></td>
                                                        <td className='pending-ad'><button onClick={(e) => balanceRequestDecline(e, user._id, requestItem.requestID)}>Decline</button></td> </>
                                                }

                                            </tr>
                                        })
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            <OffsetController offset={offset} setOffset={setOffset} />

            {
                // condition.apporoval && <div>
                //     <h4>Approved Balance Request</h4>

                //     <p>Total Approved Balance Request {userCount.apporoval} </p>
                //     <p>Total Approved Balance {userCount.approvalBalance} Tk</p>

                //     <div className="btn-group" role="group" aria-label="Basic example">
                //         <button type="button" className="btn btn-primary" onClick={requestHandle}>See Pending Request</button>
                //     </div>
                //     <table>
                //         <thead>
                //             <tr>
                //                 <th>#</th>
                //                 <th>Name</th>
                //                 <th>User Number</th>
                //                 <th>Requested Number</th>
                //                 <th>Provider</th>
                //                 <th>Amount</th>
                //                 <th>Date</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {
                //                 allUser && allUser.length > 0 && allUser.map((user) => {
                //                     if (user.balanceRequestInfo.length > 0) {
                //                         return user.balanceRequestInfo.map((reqestItem) => {
                //                             if (reqestItem.apporoval) {
                //                                 count++
                //                                 return <tr key={count}>
                //                                     <td>{count}</td>
                //                                     <td>{user.firstName} {user.lastName}</td>
                //                                     <td>{user.phoneNumber}</td>
                //                                     <td>{reqestItem.number}</td>
                //                                     <td>{reqestItem.provider}</td>
                //                                     <td>{reqestItem.amount}</td>
                //                                     <td>{reqestItem.date}</td>
                //                                 </tr>
                //                             }
                //                         })
                //                     }
                //                 })
                //             }
                //         </tbody>
                //     </table>
                // </div>
            }
        </>
    );
};

export default PendingBalanceReq;