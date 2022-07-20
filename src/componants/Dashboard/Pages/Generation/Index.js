import React from 'react';
import Header from '../../../Header/Header';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import Generation from './Generation';

const Index = () => {
    return (
        <div className='dashboard-section'>
            <Header />
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