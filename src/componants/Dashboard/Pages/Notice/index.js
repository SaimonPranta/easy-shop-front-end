import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import Notice from './Notice';

const Index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
        <DashboardHeader />
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <DashboardMenu />
            </div>
            <div>
                <Notice />
            </div>
        </div>
    </div>
    );
};

export default Index;