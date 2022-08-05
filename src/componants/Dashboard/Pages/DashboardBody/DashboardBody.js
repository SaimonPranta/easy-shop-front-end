import React, { useContext } from 'react';
import './DashboardBody.css';
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { userContext } from '../../../../App';




const DashboardBody = () => {
    const [user, setUser] = useContext(userContext);

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
                    <h5>{user && user.firstName + " " + user.lastName} {user.isActive ? "Your account is activated, you can start working now." : "Your account is not activate, you can't start work now."}</h5>
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
                        <p> {user && user.balance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>SHOPPING BALANCE</p>
                        <p> {user && user.shoppingBalance}</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING BALANCE REQUEST</p>
                        <p> {user && user.balance + user.shoppingBalance}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;