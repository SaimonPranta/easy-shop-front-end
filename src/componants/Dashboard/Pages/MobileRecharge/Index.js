import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import MobileRecharge from './MobileRecharge';

const Index = () => {
    return (
        <div>
            <div className='dashboard-section'>
            <Header />
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