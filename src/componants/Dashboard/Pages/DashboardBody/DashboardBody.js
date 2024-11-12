import React, { useContext, useEffect, useState } from "react";
import "./DashboardBody.scss";
import {  userContext } from "../../../../App";
import { userHeader } from "../../../../shared/cooki";
import { FaShare, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../../../../shared/functions/getImageUrl";

const DashboardBody = () => {
  const [user] = useContext(userContext);
  const [notice, setNotice] = useState("");
  const [noticeInput, setNoticeInput] = useState("");
  const [message, setMessage] = useState({});
  const [socialItem, setSocialItem] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/notice`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setNotice(data.data);
        }
      });
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/dashboard/get-list`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSocialItem((state) => {
            return [...data.data];
          });
        }
      });
  }, []);

  const addNotice = (e) => {
    e.preventDefault();
    if (noticeInput) {
      setNoticeInput("   ");
    }
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/notice`, {
      method: "POST",
      body: JSON.stringify({ notice: noticeInput ? noticeInput : " " }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setNotice(data.data);
        } else {
          setMessage({ failed: data.failed });
        }
      });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleNavigation = () => {
    navigate("/payments", { replace: true });
  };
  const handleNavigate = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div>
      <div className="user-dashboard-page m-auto">
        <h4>USER DASHBOARD</h4>
        {notice && (
          <div className="text-black withdraw-notice notice-section">
            <div className="inner-notice">
              {" "}
              <p>{user.firstName + " " + user.lastName}</p>{" "}
              <marquee>{notice}</marquee>
            </div>
          </div>
        )}
        {user && user.role === "admin" && (
          <>
            <div className="text-black withdraw-notice notice-section">
              <input
                type="text"
                className="form-control m-auto"
                aria-label="Text input with radio button"
                onChange={(e) => setNoticeInput(e.target.value)}
                value={noticeInput}
                placeholder="Type notice here..."
              />

              <div className="d-flex">
                <button
                  type="button"
                  onClick={addNotice}
                  className="btn btn-primary btn m-auto"
                >
                  Submit Notice
                </button>
              </div>
            </div>
            <div className="resposeContainer">
              {!message.failed && message.sucess && (
                <p className="sucess">{message.sucess}</p>
              )}
              {!message.sucess && message.failed && (
                <p className="warning">{message.failed}</p>
              )}
            </div>
          </>
        )}
        {/* <div className='dashboard-user-info'> 
                    <h5 className='user-name'><strong>{user && user.firstName + " " + user.lastName}</strong>  {user.isActive ? "Your account is activated, you can start work now." : "Your account is not activate, you can't start work now."}</h5>
                    {
                        !user.isActive && user.balance < 50 ? <sapn className="btn-group p-0 m-auto  dashbord-active-btn" role="group" aria-label="Basic example">
                            <Link to="/balance_request" type="button" className="btn btn-primary">Balance Request Now</Link>
                        </sapn> : null
                    }
                    {
                        !user.isActive && user.balance >= 50 ? <sapn className="btn-group p-0 m-auto dashbord-active-btn" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={activeHandler}>Active Now</button>
                        </sapn> : null
                    }
                    <div>
                        <p>{user && user.firstName + " " + user.lastName}</p>
                    </div>
                    <div>
                        <p>Phone Number: {user && user.phoneNumber}</p>
                    </div>
                </div> */}
        {/* <div className='dashboard-common-cart active-btn-section'>
                    <div className='inner-container'>
                        <DashboardSlider />
                    </div>
                </div> */}
        {!user.isActive && (
          <div className="dashboard-common-cart active-btn-section">
            <div className="inner-container">
              <h5>
                <strong>{user.firstName + " " + user.lastName},</strong> আপনার
                একাউন্ট অ্যাক্টিভ নয়। একাউন্ট অ্যাক্টিভ করতে নিচের Active Now
                বাটনে ক্লিক করুন।{" "}
              </h5>
              <div>
                <button onClick={handleNavigation}>Active Now</button>
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-common-cart active-btn-section">
          <div className="inner-container">
            <h5>Your Name: {user.firstName + " " + user.lastName}</h5>
            <h5>Account Number: {user.phoneNumber} </h5>
            <h5>Joining Date: {user.joinDate}</h5>
          </div>
        </div>
        {user?.referUser?.firstName && (
          <div className="dashboard-common-cart active-btn-section">
            <div className="inner-container">
              <h5>
                Upline Name:{" "}
                {user?.referUser?.firstName + " " + user?.referUser?.lastName}
              </h5>
              <h5>Upline Account Number: {user?.referUser?.phoneNumber} </h5>
            </div>
          </div>
        )}

        <div className="dashboard-common-cart">
          <div className="inner-container">
            <div className="rafael-section">
              <h6>Your Reffer Link:</h6>
              <p>{`${window.location.protocol}${window.location.host}/registration?ref=${user.phoneNumber}`}</p>
              <div>
                <button>
                  {" "}
                  <FaShare /> Share{" "}
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      `${window.location.protocol}${window.location.host}/registration?ref=${user.phoneNumber}`
                    )
                  }
                >
                  {" "}
                  <FaCopy /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-common-cart">
          <div className="inner-container">
            <div className="rafael-section">
              <h6>Your Reffer Number:</h6>
              <p>{user?.phoneNumber}</p>
              <div>
                <button>
                  {" "}
                  <FaShare /> Share{" "}
                </button>
                <button onClick={() => handleCopy(user?.phoneNumber)}>
                  {" "}
                  <FaCopy /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-common-cart active-btn-section">
          <div className="inner-container">
            <div className="social-container">
              {socialItem.length > 0 &&
                socialItem.map((info, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={getImageUrl(info?.socialMediaLogo)}
                        alt=""
                        // onDoubleClick={() =>
                        //   setViewImage(getImageUrl(info?.socialMediaLogo))
                        // }
                      />
                      <button onClick={ () =>handleNavigate(info.socialMediaLink)}>Join Now</button>
                      <h6>{info.socialMediaTitle}</h6>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
