import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import BalanceTransfer from './BalanceTransfer';

const Index = () => {
    return (
        <div className='dashboard-section'>
        <Header />
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