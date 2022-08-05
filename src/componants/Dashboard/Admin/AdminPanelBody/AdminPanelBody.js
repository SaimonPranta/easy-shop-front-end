import React from 'react';
import AdminNav from '../AdminNav/AdminNav';
import AllUser from './AllUser/AllUser';

const AdminPanelBody = () => {
    return (
        <div className='text-white'>
                <AdminNav/>
            <div className='balance-transfer-section m-auto'>

                <h4>ADMIN PANEL</h4>
                <div className='text-white withdraw-notice'>
                    <p>Withdraw between 100TK to 1000TK and 5% charge applicable for per waithdraw.</p>
                    <AllUser/>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
};

export default AdminPanelBody;