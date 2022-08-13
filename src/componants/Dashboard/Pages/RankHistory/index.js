import React from 'react';
import DashboardMenu from '../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import RankHistory from './RankHistory';

const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div className="dashbord-main-body-container">
                    <RankHistory />
                </div>
            </div>
        </div>
    );
};

export default index;