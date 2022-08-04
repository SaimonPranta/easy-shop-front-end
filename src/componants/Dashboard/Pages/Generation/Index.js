import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import Generation from './Generation';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <Generation />
                </div>
            </div>
        </div>
    );
};

export default Index;