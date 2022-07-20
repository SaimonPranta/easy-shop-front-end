import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import BalanceRequest from './BalanceRequest';

const index = () => {
    return (
        <div className='dashboard-section'>
            <Header />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <BalanceRequest />
                </div>
            </div>
        </div>
    );
};

export default index;