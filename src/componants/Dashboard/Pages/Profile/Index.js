import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import Profile from './Profile';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <Header />
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