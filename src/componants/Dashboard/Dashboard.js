import React from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import BalanceRequest from './Pages/BalanceRequest/BalanceRequest';
import BalanceTransfer from './Pages/BalanceTransfer/BalanceTransfer';
import DashboardBody from './Pages/DashboardBody/DashboardBody';
import DashboardHeader from './Pages/DashboardHeader/DashboardHeader';
import Generation from './Pages/Generation/Generation';
import MobileRecharge from './Pages/MobileRecharge/MobileRecharge';
import Withdraw from './Pages/Withdraw/Withdraw';
const Deshboard = () => {
    return (
        <div className='dashboard-section'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <DashboardBody />
                </div>
            </div>
        </div>
    );
};

export default Deshboard;