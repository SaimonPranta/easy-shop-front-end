import React from 'react';
import DashboardMenu from '../../../DashboardMenu/DashboardMenu';
import DashboardHeader from '../../DashboardHeader/DashboardHeader';
import PerGenarationList from './PerGenarationList';

const index = () => {
    return (
        <div className='dashboard-section' id='dastbord-menu-controler-contaienr'>
            <DashboardHeader />
            <div className='dashboard-container'>
                <div className='dashboard-menu'>
                    <DashboardMenu />
                </div>
                <div>
                    <PerGenarationList />
                </div>
            </div>
        </div>
    )
};

export default index;