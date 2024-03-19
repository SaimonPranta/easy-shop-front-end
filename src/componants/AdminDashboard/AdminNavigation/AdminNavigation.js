import React, { createContext, useContext } from "react";
import "./AdminNavigation.css";
import { NavLink } from "react-router-dom";

import { FaHome, FaSearchDollar, FaTh } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { RiProductHuntLine, RiProfileFill, RiSecurePaymentFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { userContext } from "../../../App";
import { MdAccountBalanceWallet, MdSupport } from "react-icons/md";
import { AiFillAccountBook } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { SiMicrosoftteams } from "react-icons/si";
import { GiRank3 } from "react-icons/gi";
import { MdCompost } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";

const AdminNavigation = () => {
  const [user, setUser] = useContext(userContext);
  const handleSubMenu = () => {
    document.getElementById("sub-menu").classList.toggle("active-sub-menu");
  };
  const hanleLogOut = () => {
    document.cookie = "token=";
    setUser({});
  };

  return (
    <>
      <ul className="side-nav-container">
        <div className="user-profile">
          <FaRegUserCircle />
          <p>{`${user?.firstName} ${user?.lastName}`} </p>
        </div>
        <li>
          <NavLink to="/dashboard">
            <FaQrcode />
            <span> Dashboard</span>
          </NavLink>
        </li>   
        <li>
          <NavLink to="/admin/help-line">
            <MdSupport />
            <span> Help Line</span>
          </NavLink>
        </li>   
        <li>
          <NavLink to="/admin/notification">
            <IoNotifications />
            <span> Admin Notification</span>
          </NavLink>
        </li>   
        
        <li>
          <a onClick={hanleLogOut}>
            <BiLogOut />
            <span> Log Out</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default AdminNavigation;
 