import React from 'react';
import './Dashboard.scss';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardBody from './Pages/DashboardBody/DashboardBody';
import DashboardHeader from './Pages/DashboardHeader/DashboardHeader';
const Deshboard = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container '>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <DashboardBody />
                </div>
            </div>
        </div>
    );
};


export default Deshboard;

