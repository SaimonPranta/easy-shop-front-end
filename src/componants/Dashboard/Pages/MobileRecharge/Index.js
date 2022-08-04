import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import MobileRecharge from './MobileRecharge';

const Index = () => {
    return (
        <div>
            <div className='dashboard-section'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <MobileRecharge />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Index;