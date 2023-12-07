import React, { createContext, useContext } from "react";
import "./DashboardMenu.css";
import { NavLink } from "react-router-dom";

import { FaTh } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
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

const DashboardMenu = () => {
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
      <ul className="">
        <li>
          <NavLink to="/dashboard">
            <FaQrcode />
            <span> Dashboard</span>
          </NavLink>
        </li>
        <li>
          <FaUserAlt /> <span onClick={handleSubMenu}> Profile</span>
          <ul className="sub-menu" id="sub-menu">
            <li>
              <NavLink to="/porfile/update_profile">
                <span>
                  <FaUserEdit /> Update Profile
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/porfile/change_password">
                <span>
                  {" "}
                  <FaUnlockAlt /> Change Password
                </span>
              </NavLink>
            </li>
          </ul>
        </li>
        {user.role === "admin" && (
          <li>
            <NavLink to="/admin_panel">
              <FaUserCog />
              <span> Admin Panel </span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/balance_transfer">
            <FaHandshake />
            <span> Balance transfer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/balance_request">
            <FaMoneyCheckAlt />
            <span> Balance request</span>
          </NavLink>
        </li>
        {/* <li><NavLink to='/mobile_recharge'><FaMobileAlt /><span > Mobile recharge</span></NavLink></li> */}
        <li>
          <NavLink to="/generation">
            <FaUsersCog />
            <span> Generation</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/rank_history">
            <FaMedal />
            <span> Rank History </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/withdraw">
            <FaDonate />
            <span> Withdraw </span>
          </NavLink>
        </li>
        {user.role === "admin" && (
          <li>
            <NavLink to="/product">
              <RiProductHuntLine />
              <span>Product</span>
            </NavLink>
          </li>
        )}
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

export default DashboardMenu;
