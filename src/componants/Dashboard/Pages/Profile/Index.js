import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import Profile from './Profile';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Index;