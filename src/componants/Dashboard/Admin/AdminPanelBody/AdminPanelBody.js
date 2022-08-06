import React, { createContext, useEffect, useState } from 'react';
import "./AdminPanelBody.css";
import AdminNav from '../AdminNav/AdminNav';
import AllUser from './AllUser/AllUser';
import PendingBalanceReq from '../PendingBalanceReq/PendingBalanceReq';

export const allUserContext = createContext();


const AdminPanelBody = () => {
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        const cooki = document.cookie.split("=")[1];
        if (cooki) {
            fetch("http://localhost:8000/admin/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.failed) {
                        console.log(data.failed)
                    } else {
                        setAllUser(data);
                    }
                })
        }
    }, []);

    return (
        <allUserContext.Provider value={[allUser, setAllUser]}>
            <div className='text-white'>
                <AdminNav />
                <div className='balance-transfer-section m-auto admin-section'>

                    {/* <h4>ADMIN PANEL</h4> */}
                    <div className='text-white withdraw-notice'>
                        {/* <AllUser/> */}
                        <PendingBalanceReq />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </allUserContext.Provider>
    )
};

export default AdminPanelBody;