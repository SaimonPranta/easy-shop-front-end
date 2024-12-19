import React, { useEffect, useState } from 'react';
import './DashboardHeader.css';
import { Link, NavLink } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa";
import { IoNotifications } from 'react-icons/io5';
import { getCooki } from '../../../../shared/cooki';

const DashboardHeader = () => {
    const [noticeCount, setNoticeCount] = useState(0)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/notification`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`

            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    const getNoticeCount = localStorage.getItem("seenNotificationCount") || 0
                    let finalAmount = data.data.length - getNoticeCount;
                    if (finalAmount < 0) {
                        finalAmount = data.data.length
                    }
                    setNoticeCount(finalAmount)
                }
                if (data.massage) {
                    // FailedTost(data.massage)
                }

            })
    }, [])

    const dashboardMenuHandller = () => {
        const dashbordContaienr = document.getElementById("dastbord-menu-controler-contaienr")
        dashbordContaienr.classList.toggle("dashbord-active")
    }



    return (
        <section className='mb-1 dashbord-header'>
            <nav className="navbar navbar-expand-lg navbar-light text-white">
                <div className="container-fluid">
                    <div className='dashbord-control-icon' onClick={dashboardMenuHandller}>
                        <FaAlignLeft />
                    </div>
                    {/* <Link className="navbar-brand " to="/"><img src={logo} alt="EasyShop50" className='logo' /></Link> */}
                    <div>
                        <Link to="/notification" className="notification-icon-container notification-icon-container-mobile">
                            <IoNotifications />
                            <span>{noticeCount}</span>
                        </Link>
                        <button className="navbar-toggler nav-collaps-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>


                    <div className="collapse navbar-collapse dashbord-nav-items" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" >HOME</NavLink>
                            </li>
                          
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >PRODUCTS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about_us" className="nav-link active" aria-current="page" >ABOUT US</NavLink>
                            </li>
                            <li className="nav-item ">
                                <Link to="/notification" className="notification-icon-container notification-icon-container-pc">
                                    <IoNotifications />
                                    <span>{noticeCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item menu-icons">
                                {/* <span>{loaveIcon}</span>
                                <span>{cartIcon}</span>
                                <span>{balanceIcon}</span> */}
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </section>
    );
};

export default DashboardHeader;