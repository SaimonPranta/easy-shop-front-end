import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import BalanceRequest from './BalanceRequest';

const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container dashboard-container-active'>
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