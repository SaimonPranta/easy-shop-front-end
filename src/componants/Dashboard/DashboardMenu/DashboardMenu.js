import React from 'react';
import './DashboardMenu.css';
import { NavLink } from 'react-router-dom';

import { FaTh } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";


const DashboardMenu = () => {
    return (
        <>
            <ul>
                <li><FaQrcode/> <span> Dashboard</span></li>
                <li><FaUserAlt/> <span> Profile</span></li>
                <li><FaHandshake/> <span> Balance transfer</span></li>
                <li><FaMoneyCheckAlt/> <span> Balance request</span></li>
                <li><FaMobileAlt/> <span> Mobile recharge</span></li>
                <li><NavLink to='generation'><FaUsersCog/> <span> Generation</span></NavLink></li>
                <li><FaDonate/> <span> Withdraw </span></li>
                <li><BiLogOut/> <span> Log Out</span></li>
                
            </ul>
        </>
    );
};

export default DashboardMenu;