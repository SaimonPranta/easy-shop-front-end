import React from 'react';
import './DashboardBody.css';
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";




const DashboardBody = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>USER DASHBOARD</h4>
                <div className='text-black withdraw-notice notice-section'>
                    <marquee>আসসালামু আলাইকুম Easy Shop 50 কোম্পানির পক্ষ থেকে আপনাদের জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন</marquee>
                    {/* <p>আসসালামু আলাইকুম Easy Shop 50 কোম্পানির পক্ষ থেকে আপনাদের জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন</p> */}
                </div>
                {/* <div className=' withdraw-notice'>
                    <p>Mehedi Ahmed Your account is activated, you can start working now</p>
                </div> */}
                <div className='dashboard-user-info'>
                    <h5>Welcome</h5>
                    <p>Mehadi Hasan</p>
                    <h5>Your account is activated, you can start working now.</h5>
                    <div>
                        <p>Mehadi Hasan</p>
                    </div>
                    <div>
                        <p>Phone Number: 01836759162</p>
                    </div>
                </div>

                <div className='balnce-section text-center'>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>INCOME BALANCE</p>
                        <p>0</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>SHOPPING BALANCE</p>
                        <p>0</p>
                    </div>
                    <div>
                        <FaRegMoneyBillAlt />
                        <p>TOTAL PENDING BALANCE REQUEST</p>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;