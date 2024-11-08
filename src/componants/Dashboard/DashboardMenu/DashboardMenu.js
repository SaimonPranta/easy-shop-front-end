import React, { createContext, useContext } from "react";
// import "./DashboardMenu.scss";
import { NavLink } from "react-router-dom";

import { FaHome, FaSearchDollar, FaUniversalAccess } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import {
  RiProductHuntLine,
  RiProfileFill,
  RiSecurePaymentFill,
} from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { userContext } from "../../../App";
import { MdAccountBalanceWallet, MdOutlineSelfImprovement, MdVolunteerActivism } from "react-icons/md";
import { AiFillAccountBook } from "react-icons/ai";
import { MdLiveHelp } from "react-icons/md";
import { SiMicrosoftteams } from "react-icons/si";
import { GiRank3 } from "react-icons/gi";
import { MdCompost } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { userHeader } from "../../../shared/cooki";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";

import { ToastContainer } from "react-toastify";
import getImageUrl from "../../../shared/functions/getImageUrl";

const DashboardMenu = () => {
  const [user, setUser] = useContext(userContext);
  const handleSubMenu = () => {
    document.getElementById("sub-menu").classList.toggle("active-sub-menu");
  };
  const hanleLogOut = () => {
    document.cookie = "token=";
    setUser({});
  };
  const handleProfileImgSubmit = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("img", file);

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/profile/profile-pic`, {
      method: "POST",
      headers: {
        ...userHeader(),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data ==>>", data);
        if (data.data) {
          setUser(data.data);
          SuccessTost("Profile picture has been uploaded successfully");
        } else if (data.message) {
          FailedTost(data.message);
        }
      });
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
            <>
              <label htmlFor="fileUpload">
                <MdOutlineEdit />
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={handleProfileImgSubmit}
              />
            </>
          </button>
          <p>{`${user?.firstName} ${user?.lastName}`} </p>
        </div>
        <li>
          <NavLink to="/dashboard">
            <FaQrcode />
            <span> Dashboard</span>
          </NavLink>
        </li>

        <li className="nesting-menu">
          <p>
            <FaHome />{" "}
            <span>
              {" "}
              Home <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>
        <li className="nesting-menu">
          <p>
            <FaUserAlt /> <span onClick={handleSubMenu}> Profile</span>
          </p>
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
        <li className="nesting-menu">
          <NavLink to="/my-balance">
            <span>
              <MdAccountBalanceWallet /> My Balance
            </span>
          </NavLink>
          {/* <p><span >My Balance <p className="upcomming">Upcoming</p></span></p> */}
        </li>
        <li>
          <NavLink to="/balance_request">
            <FaMoneyCheckAlt />
            <span> Balance request</span>
          </NavLink>
        </li>
        <li className="nesting-menu">
          <NavLink to="/daily-task">
            <RiProfileFill />
            <span> Daily Task</span>
          </NavLink>
          {/* <p><RiProfileFill /> <span >  Daily Jobs <p className="upcomming">Upcoming</p></span></p> */}
        </li>
        <li className="nesting-menu">
          <NavLink to="/payments">
            <RiSecurePaymentFill />
            <span> Payments</span>
          </NavLink>
        </li>
        {/* <li className="nesting-menu">
          <p>
            <RiSecurePaymentFill />{" "}
            <span>
              Payment Reviews <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li> */}
        <li className="nesting-menu">
          <p>
            <AiFillAccountBook />{" "}
            <span>
              Premium Account <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>
        <li className="nesting-menu">
          <p>
            <FaSearchDollar />{" "}
            <span>
              Earnings <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>
        <li className="nesting-menu">
          <NavLink to="/helpline">
            <MdLiveHelp />
            <span> Help Line</span>
          </NavLink>
        </li>
        <li className="nesting-menu">
          <p>
            <MdCompost />{" "}
            <span>
              Competitions <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>
        <li className="nesting-menu">
          <p>
            <MdVolunteerActivism />{" "}
            <span>
              Active User <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>
        <li className="nesting-menu">
          <NavLink to="/">
            <MdLiveHelp />
            <span> Shop Now </span>
          </NavLink>
        </li>
        {/* <li className="nesting-menu">
          <p>
            <SiMicrosoftteams />{" "}
            <span>
               <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li> */}
        <li>
          <NavLink to="/refer-team-member">
            <SiMicrosoftteams />
            <span> Refer Team Members</span>
          </NavLink>
        </li>
        <li className="nesting-menu">
          <p>
            <GiRank3 />{" "}
            <span>
              Rank Leaders <p className="upcomming">Upcoming</p>
            </span>
          </p>
        </li>

      
        {/* <li>
          <NavLink to="/balance_transfer">
            <FaHandshake />
            <span> Balance transfer</span>
          </NavLink>
        </li> */}

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
        <li>
          <NavLink to="/salary">
            <FaUniversalAccess />
            <span> Salary </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/prove">
            <MdOutlineSelfImprovement />
            <span> Prove </span>
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
          {user.role === "admin" && (
          <li>
            <NavLink to="/admin/user">
              <FaUserCog />
              <span> Admin Panel </span>
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
      <ToastContainer />
    </>
  );
};

export default DashboardMenu;
