import React, { createContext, useEffect, useState } from 'react';
import "./AdminPanelBody.css";
import Nav from 'react-bootstrap/Nav';
import AllUser from './AllUser/AllUser';
import PendingBalanceReq from '../PendingBalanceReq/PendingBalanceReq';
import PendingMobileRecharge from '../PendingMobileRecharge/PendingMobileRecharge';
import PendingWithdraw from '../PendingWithdraw/PendingWithdraw';
import SliderControl from '../SliderControl/Index';





export const allUserContext = createContext();


const AdminPanelBody = () => {
    const [allUser, setAllUser] = useState([])
    const [condition, setCondition] = useState(1)


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
                <div>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={() => setCondition(1)} >Users</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setCondition(2)}>Balance Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setCondition(3)}>Recharge Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setCondition(4)}>Withdraw Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setCondition(5)}>Slider Setting</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className='balance-transfer-section m-auto admin-section'>
                    <div className='text-white withdraw-notice'>
                        {
                            condition === 1 && <AllUser />
                        }
                        {
                            condition === 2 && <PendingBalanceReq />
                        }
                        {
                            condition === 3 && <PendingMobileRecharge />
                        }
                        {
                            condition === 4 && <PendingWithdraw />
                        }
                        {
                            condition === 5 && <SliderControl />
                        }
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </allUserContext.Provider>
    )
};

export default AdminPanelBody;