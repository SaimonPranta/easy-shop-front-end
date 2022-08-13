import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import Profile from './Profile';

const Index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Index;