import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import BalanceTransfer from './BalanceTransfer';

const Index = () => {
    return (
        <div className='dashboard-section'>
        <DashboardHeader />
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <DashboardMenu />
            </div>
            <div>
                <BalanceTransfer />
            </div>
        </div>
    </div>
    );
};

export default Index;