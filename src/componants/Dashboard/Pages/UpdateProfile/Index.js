import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import UpdateProfile from './UpdateProfile';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <Header />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <UpdateProfile />
                </div>
            </div>
        </div>
    );
};

export default Index;