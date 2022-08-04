import React from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardBody from './Pages/DashboardBody/DashboardBody';
import DashboardHeader from './Pages/DashboardHeader/DashboardHeader';
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