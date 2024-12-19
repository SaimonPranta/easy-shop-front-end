import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaDonate,
  FaQrcode,
  FaUniversalAccess,
  FaRegImage,
  FaUsersCog,
} from "react-icons/fa";
import { BiCategory, BiLogOut } from "react-icons/bi";
import { userContext } from "../../../App";
import {
  MdOutlineAccountBalance,
  MdOutlineViewCarousel,
  MdPostAdd,
  MdSupport,
  MdOutlineArrowDropDown,
} from "react-icons/md";
import { IoConstructOutline, IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { RiSecurePaymentFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import { userHeader } from "../../../shared/cooki";
import BlueBadgeSvg from "./Modals/BlueBadgeSvg";

const navItems = [
  {
    icon: <FaQrcode />,
    label: "Dashboard",
    route: "/dashboard",
    admin: false,
  },

  {
    icon: <FaQrcode />,
    label: "Dashboard Config",
    route: "/admin/dashboard",
    admin: false,
  },

  {
    icon: <FaUsersCog />,
    label: "User List",
    route: "/admin/user",
    admin: false,
  },

  {
    icon: <MdSupport />,
    label: "Help Line",
    route: "/admin/help-line",
    admin: false,
  },

  {
    icon: <IoNotifications />,
    label: "Notification",
    route: "/admin/notification",
    admin: false,
  },

  {
    icon: <MdOutlineAddTask />,
    label: "Daily Task",
    route: "/admin/daily-task",
    admin: false,
  },

  {
    icon: <MdOutlineAddTask />,
    label: "Daily Task List",
    route: "/admin/daily-task-list",
    admin: false,
  },
  {
    icon: <FaDonate />,
    label: "Withdraw",
    route: "/admin/withdraw",
    admin: false,
  },
  {
    icon: <RiSecurePaymentFill />,
    label: "Payments",
    route: "/admin/payments",
    admin: false,
  },
  {
    icon: <MdPostAdd />,
    label: "Prove Post",
    route: "/admin/prove-post",
    admin: false,
  },
  {
    icon: <FaUniversalAccess />,
    label: "Admin Salary",
    route: "/admin/salary",
    admin: false,
  },
  {
    icon: <MdOutlineViewCarousel />,
    label: "Slider",
    route: "/admin/slider",
    admin: false,
  },

  {
    icon: <BiCategory />,
    label: "Categories",
    route: "/admin/categories",
    admin: false,
  },

  {
    icon: <MdOutlineAccountBalance />,
    label: "Balance Transfer Config",
    route: "/admin/balance-transfer-config",
    admin: false,
  },

  {
    icon: <IoConstructOutline />,
    label: "Config",
    route: "/admin/config",
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
  // const hanleLogOut = () => {
  //   document.cookie = "token=";
  //   setUser({});
  // };
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
              <BlueBadgeSvg className="badge" />
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
                    {/* {item.subNavItems?.length > 0 && (
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
                    )} */}
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
