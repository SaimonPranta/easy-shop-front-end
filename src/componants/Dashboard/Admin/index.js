import React from 'react';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import DashboardHeader from '../Pages/DashboardHeader/DashboardHeader';
import Withdraw from '../Pages/Withdraw/Withdraw';
import AdminPanelBody from './AdminPanelBody/AdminPanelBody';

const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container '>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <AdminPanelBody />
                </div>
            </div>
        </div>
    );
};

export default index;