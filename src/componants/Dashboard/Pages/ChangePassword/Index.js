import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import ChangePassword from './ChangePassword';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <Header />
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