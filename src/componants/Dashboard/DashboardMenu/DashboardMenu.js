import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaRegImage,
  FaSearchDollar,
  FaUniversalAccess,
  FaUserClock,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { FaQrcode } from "react-icons/fa";
import { RiProfileFill, RiSecurePaymentFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { userContext } from "../../../App";
import {
  MdAccountBalanceWallet,
  MdOutlineAccountBalance,
  MdOutlineArrowDropDown,
  MdOutlineSelfImprovement,
} from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { SiMicrosoftteams } from "react-icons/si";
import { GiRank3 } from "react-icons/gi";
import { userHeader } from "../../../shared/cooki";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import { ToastContainer } from "react-toastify";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { FiShoppingBag } from "react-icons/fi";
import BlueBadgeSvg from "../../AdminDashboard/AdminNavigation/Modals/BlueBadgeSvg";

const navItems = [
  {
    icon: <FaUserCog />,
    label: "Admin Panel",
    route: "/admin/user",
    admin: true,
  },
  {
    icon: <FaQrcode />,
    label: "Dashboard",
    route: "/dashboard",
    admin: false,
  },
  {
    icon: <FaHome />,
    label: "Home",
    route: "/earn-money",
    admin: false,
  },
  {
    icon: <FaUserAlt />,
    label: "My Profile",
    route: "/profile",
    admin: false,
    subNavItems: [
      {
        icon: <FaUserEdit />,
        label: "Update Profile",
        route: "/porfile/update_profile",
        admin: false,
      },
      {
        icon: <FaUnlockAlt />,
        label: "Change Password",
        route: "/porfile/change_password",
        admin: false,
      },
    ],
  },
  {
    icon: <MdAccountBalanceWallet />,
    label: " My Balance",
    route: "/my-balance",
    admin: false,
  },
  {
    icon: <RiProfileFill />,
    label: "Daily Task",
    route: "/daily-task",
    admin: false,
  },
  {
    icon: <RiSecurePaymentFill />,
    label: "Payments",
    route: "/payments",
    admin: false,
  },
  {
    icon: <FaSearchDollar />,
    label: "My Earnings",
    route: "/earnings",
    admin: false,
  },
  {
    icon: <FaUsersCog />,
    label: "My Generation List",
    route: "/generation",
    admin: false,
  },
  {
    icon: <SiMicrosoftteams />,
    label: "Referral Member List",
    route: "/refer-team-member",
    admin: false,
  },
  {
    icon: <BiSupport />,
    label: "Help Line",
    route: "/helpline",
    admin: false,
  },
  {
    icon: <FaDonate />,
    label: "Withdraw",
    route: "/withdraw",
    admin: false,
  },
  {
    icon: <MdOutlineAccountBalance />,
    label: "Balance Transfer",
    route: "/balance-transfer",
    admin: false,
  },
  {
    icon: <AiOutlineYoutube />,
    label: "Works Tutorial",
    route: "/tutorial",
    admin: false,
  },
  {
    icon: <MdOutlineSelfImprovement />,
    label: "Payment Review",
    route: "/prove",
    admin: false,
  },
  {
    icon: <FaUniversalAccess />,
    label: "Salary Bonus",
    route: "/salary",
    admin: false,
  },
  {
    icon: <FaMedal />,
    label: "My Rank",
    route: "/rank_history",
    admin: false,
  },
  {
    icon: <GiRank3 />,
    label: "Rank Leaders",
    route: "/rank-leaders",
    admin: false,
  },
  {
    icon: <FiShoppingBag />,
    label: "Shop Now",
    route: "/",
    admin: false,
  },
  {
    icon: <FaUserClock />,
    label: "Generation History",
    route: "/generation-history",
    admin: false,
  },
  {
    icon: <BiLogOut />,
    label: "Log Out",
    admin: false,
  },
];

const Index = () => {
  const [user, setUser] = useContext(userContext);

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
      <div className="navigation-container rm-scroll-bar">
        <div className="inner-container">
          <div className="user-profile">
            <div className="picture-container">
              {user.profilePicture && (
                <img src={getImageUrl(user.profilePicture)} alt="" />
              )}
              {!user.profilePicture && <FaRegImage />}
              {user?.blueTickInfo?.blurTick && (
                <BlueBadgeSvg className="badge" />
              )}
            </div>
            {/* <>
                <label htmlFor="fileUpload">
                  <MdOutlineEdit />
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleProfileImgSubmit}
                />
              </> */}
            <div className="info-container">
              <p className="name">{`${user?.firstName} ${user?.lastName}`} </p>
              <p className="rank">Start Member</p>
            </div>
          </div>
          <div className="nav-section">
            <ul className="rm-scroll-bar">
              {navItems.map((item, index) => {
                if (item.admin && user.role !== "admin") {
                  return <></>;
                }
                return (
                  <li key={index}>
                    {!item.route && (
                      <a onClick={hanleLogOut}>
                        {item.icon} <span>{item.label}</span>
                        {item.subNavItems?.length > 0 && (
                          <MdOutlineArrowDropDown className="arrow" />
                        )}
                      </a>
                    )}
                    {item.route && (
                      <NavLink to={item.route}>
                        {" "}
                        {item.icon} <span>{item.label}</span>
                        {item.subNavItems?.length > 0 && (
                          <MdOutlineArrowDropDown className="arrow" />
                        )}
                      </NavLink>
                    )}
                    {item.subNavItems?.length > 0 && (
                      <ul>
                        {item?.subNavItems.map((subItem, subIndex) => {
                          return (
                            <li>
                              <NavLink to={subItem.route} key={subIndex}>
                                {subItem.icon} <span>{subItem.label}</span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;
