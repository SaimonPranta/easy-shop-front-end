import React, { useContext, useEffect, useState } from 'react';
import dateFormater from '../../../../Functions/dateFormater';
import { allUserContext } from '../AdminPanelBody/AdminPanelBody';

const PendingBalanceReq = () => {
    const [allUser, setAllUser] = useContext(allUserContext)
    const [currentUser, setCurrentUser] = useState([]);
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






    return (
        <>
            {
                !condition.apporoval && <div>
                    <h4>Pending Balance Request</h4>
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
                                                    <td className="bg-success" onClick={(e) => balanceRequestApproval(e, user._id, reqestItem.requestID, reqestItem.amount)}>Approve</td>
                                                    <td class="bg-primary">Decline</td>
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
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={requestHandle}>See Pending Request</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>User ID</th>
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
                                                    <td>{user._id}</td>
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