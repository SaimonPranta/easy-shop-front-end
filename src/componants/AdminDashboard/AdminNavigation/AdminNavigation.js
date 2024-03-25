import React, { createContext, useContext } from "react";

import { NavLink } from "react-router-dom";
import { FaQrcode } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { userContext } from "../../../App";
import {  MdSupport } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const AdminNavigation = () => {
  const [user, setUser] = useContext(userContext);

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
 