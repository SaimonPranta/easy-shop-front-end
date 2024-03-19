import React from 'react';
import './DashboardHeader.css';
import { Link, NavLink } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa";
// import logo from "../../../../assets/images/logo.png";

const DashboardHeader = () => {


    const dashboardMenuHndller = () => {
        const dashbordContaienr = document.getElementById("dastbord-menu-controler-contaienr")
        dashbordContaienr.classList.toggle("dashbord-active")
    }


    return (
        <section className=' mb-1 dashbord-header'>
            <nav className="navbar navbar-expand-lg navbar-light text-white px-2 m-auto">
                <div className="container-fluid">
                    <div className='dashbord-control-icon d-md-none' onClick={dashboardMenuHndller}>
                        <FaAlignLeft/>
                    </div>
                    {/* <Link className="navbar-brand " to="/"><img src={logo} alt="EasyShop50" className='logo' /></Link> */}
                    
                    <button className="navbar-toggler nav-collaps-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


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