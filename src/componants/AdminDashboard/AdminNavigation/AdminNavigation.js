import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaDonate, FaQrcode, FaUniversalAccess, FaUsersCog } from "react-icons/fa";
import { BiCategory, BiLogOut } from "react-icons/bi";
import { userContext } from "../../../App";
import { MdOutlineViewCarousel, MdPostAdd, MdSupport } from "react-icons/md";
import { IoConstructOutline, IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { RiSecurePaymentFill } from "react-icons/ri";   

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
          <button className="profile-pic-btn">
            <div className="picture-container">
              {user.profilePicture && (
                <img src={getImageUrl(user.profilePicture)} alt="" />
              )}
              {!user.profilePicture && <FaRegUserCircle />}
            </div>
          </button>
        </div>
        <li>
          <NavLink to="/dashboard">
            <FaQrcode />
            <span> Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/user">
          <FaUsersCog />
            <span> User List</span>
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
            <span>Notification</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/daily-task">
            <MdOutlineAddTask />
            <span> Daily Task</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/daily-task-list">
            <MdOutlineAddTask />
            <span> Daily Task List</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/withdraw">
            <FaDonate />
            <span> Withdraw</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments">
            <RiSecurePaymentFill />
            <span> Payments</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/prove-post">
          <MdPostAdd />
            <span> Prove Post</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/salary">
          <FaUniversalAccess />
            <span> Admin Salary</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/slider">
          <MdOutlineViewCarousel />
            <span> Slider</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories">
          <BiCategory />
            <span> Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin_panel">
            <IoConstructOutline />
            <span> Config</span>
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
