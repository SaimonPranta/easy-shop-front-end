import React from 'react';
// import DashboardMenu from '../DashboardMenu/DashboardMenu';
import AdminDashboardMenu from "../AdminNavigation/AdminNavigation"
import DashboardHeader from '../../Dashboard/Pages/DashboardHeader/DashboardHeader';
import AdminWithdrawConfig from './AdminWithdrawConfig';
    
const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container '>
                <div className='dashboard-menu'>
                    <AdminDashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <AdminWithdrawConfig />
                </div>
            </div>
        </div>
    );
};

export default index;