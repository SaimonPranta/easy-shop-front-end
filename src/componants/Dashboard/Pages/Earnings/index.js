import React from 'react';
// import DashboardHeader from '../Dashboard/Pages/DashboardHeader/DashboardHeader'; 
 import AdminPayments from './Earnings';
 import DashboardMenu from '../../DashboardMenu/DashboardMenu';
 import DashboardHeader from '../DashboardHeader/DashboardHeader';

const index = () => {
    return (
        <div className='dashboard-section'  id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container '>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <AdminPayments />
                </div>
            </div>
        </div>
    );
};

export default index;