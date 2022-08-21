import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allUserContext } from '../AdminPanelBody';

const AllUser = () => {
    const [allUser, setAllUser] = useContext(allUserContext)
    const [allUserContaienr, setAllUserContainer] = useState([]);
    const [userCount, setUserCount] = useState({
        total: 0,
        active: 0,
        unActive: 0,
        activeUserBalance : 0,
        activeUserIcomeBalance : 0
    })

    let count = 0;
    let totalUser = 0
    let totalActiveUser = 0
    let totalUnativeUser = 0
    let totalActiveUserBalance = 0
    let totalActiveUserIncomeBalance = 0




    useEffect(() => {
        if (allUser && allUser.length > 0) {
            totalUser = 0;
            totalActiveUser = 0;
            totalUnativeUser = 0
            totalActiveUserBalance = 0;
            totalActiveUserIncomeBalance = 0;
            allUser.map((user) => {
                const currentUserCount = { ...userCount }

                
                totalUser++
                totalActiveUser = user.isActive ? totalActiveUser + 1 : totalActiveUser
                totalUnativeUser = !user.isActive ? totalUnativeUser + 1 : totalUnativeUser
                totalActiveUserBalance =  user.isActive ? totalActiveUserBalance + user.balance : totalActiveUserBalance
                totalActiveUserIncomeBalance =  user.isActive ? totalActiveUserIncomeBalance + user.totalIncome : totalActiveUserIncomeBalance

                currentUserCount["total"] = totalUser
                currentUserCount["active"] = totalActiveUser
                currentUserCount["unActive"] = totalUnativeUser
                currentUserCount["activeUserBalance"] = totalActiveUserBalance
                currentUserCount["activeUserIcomeBalance"] = totalActiveUserIncomeBalance



                setUserCount(currentUserCount)
                return null
            })
        }
        if (allUser.length > 0) {
            setAllUserContainer(allUser)
        }
    }, [allUser]);

    const seach_handler = (event) => {
        let inputValue = event.target.value.toString().length > 0 ? event.target.value.toString() : "0";
        if (inputValue == 0) {
            setAllUserContainer(allUser)
        } else {
            let currentUser = allUserContaienr.filter((valuee) => {
                let stringValue = valuee.phoneNumber.toString()
                let phoneNumValue = stringValue.length > 0 ? stringValue.toString() : "0"
                let varifiying = phoneNumValue.includes(inputValue)
                return varifiying
            })
            setAllUserContainer(currentUser)
        }
    }


    return (
        <div>
            <div className='balnce-section text-center text-white dashboard-sub-section' style={{height: "100%"}}>
                <div style={{height: "100%"}} >
                    <p>Total User {userCount.total}</p>

                    <p>Total Active User {userCount.active}</p>

                    <p>Total Unactive User {userCount.unActive}</p>
                    <p>Total Active User Balance {userCount.activeUserBalance} Tk</p>
                    <p>Total Active User Income Balance {userCount.activeUserIcomeBalance} Tk</p>


                </div>
            </div>
            <div className="input-group admin-search">
                <input type="text" className="form-control" aria-label="Text input with radio button" onChange={seach_handler} placeholder='Search by Phone Number' />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>User Number</th>
                        <th>Balance</th>
                        <th>Shoping Balance</th>
                        <th>Status</th>
                        <th colSpan="2">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUserContaienr && allUserContaienr.length > 0 && allUserContaienr.map((user) => {
                            count++
                            return <tr key={count}>
                                <td>{count}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.balance}</td>
                                <td>{user.shoppingBalance}</td>
                                <td>{user.isActive ? "Active" : "Unactive"}</td>
                                <td className=' admin-approved'><Link to={`/user/${user._id}`} >View Details</Link></td>
                                <td className='admin-pending'> <Link to={`/edit_user/${user._id}`}>Edit Details</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;