import React, { useContext, useState } from 'react';
import dateFormater from '../../../../Functions/dateFormater';
import { allUserContext } from '../AdminPanelBody/AdminPanelBody';

const PendingWithdraw = () => {
    const [allUser, setAllUser] = useContext(allUserContext)
    const [currentUser, setCurrentUser] = useState([]);
    const [message, setMessage] = useState({})
    const [condition, setCondition] = useState({
        apporoval: false
    })
    const cooki = document.cookie.split("=")[1];

    let count = 0
    const requestHandle = () => {
        const currentCondition = { ...condition }
        currentCondition.apporoval = currentCondition.apporoval ? currentCondition.apporoval = false : currentCondition.apporoval = true
        setCondition(currentCondition)
    };



    const withdrawRequestApproval = (e, id, requestID, amount) => {
        setMessage({})
        if (id && requestID, amount) {
            fetch("http://localhost:8000/withdraw_request_approval", {
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
                        setMessage({})
                        e.target.parentNode.style.display = "none"
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
            fetch("http://localhost:8000/withdraw_request_decline", {
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
                    <h4>Pending Withdraw Request</h4>
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
                                    if (user.withdrawInfo.length > 0) {
                                        return user.withdrawInfo.map((reqestItem) => {
                                            if (!reqestItem.apporoval) {
                                                count++
                                                return <tr>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.porvider}</td>
                                                    <td>{reqestItem.amount}</td>
                                                    <td>{dateFormater(reqestItem.date)}</td>
                                                    <td className="bg-success" onClick={(e) => withdrawRequestApproval(e, user._id, reqestItem.requestID, reqestItem.amount)}>Approve</td>
                                                    <td class="bg-primary" onClick={(e) => withdrawRequestDecline(e, user._id, reqestItem.requestID)}>Decline</td>
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
                    <h4>Approved Withdraw Request</h4>
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
                                    if (user.withdrawInfo.length > 0) {
                                        return user.withdrawInfo.map((reqestItem) => {
                                            if (reqestItem.apporoval) {
                                                count++
                                                return <tr>
                                                    <td>{count}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>{reqestItem.number}</td>
                                                    <td>{reqestItem.porvider}</td>
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

export default PendingWithdraw;