import React from 'react';
// import DashboardMenu from '../DashboardMenu/DashboardMenu';
import AdminDashboardMenu from "../AdminNavigation/AdminNavigation"
import DashboardHeader from '../../Dashboard/Pages/DashboardHeader/DashboardHeader'; 
 import AdminSlider from './SliderControl/Index';

const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container '>
                <div className='dashboard-menu'>
                    <AdminDashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <AdminSlider />
                </div>
            </div>
        </div>
    );
};

export default index;