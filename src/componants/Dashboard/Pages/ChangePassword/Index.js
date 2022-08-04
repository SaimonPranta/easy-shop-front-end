import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import ChangePassword from './ChangePassword';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default Index;