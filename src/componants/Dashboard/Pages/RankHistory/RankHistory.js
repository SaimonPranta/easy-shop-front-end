import React, { useContext } from "react";
import { userContext } from "../../../../App";
import "./RankHistory.scss";
import { FaMedal, FaRegUserCircle } from "react-icons/fa";
import star from "../../../../assets/images/star.png";
import getImageUrl from "../../../../shared/functions/getImageUrl";

const RankHistory = () => {
  const [user, setUser] = useContext(userContext);
  return (
    <div className="rank-history-page">
      <div className="inner-container">
        <div className="title-section">
          <h4 className="dashboard-title">My Rank</h4>
        </div>

        {!user?.rankID && (
          <div className="no-rank">
            <div className="cart">
              <div className="icon-section">
                <FaMedal />
              </div>
              <div className="des-section">
                <h6>Your Rank</h6>
                <p>Coming soon...</p>
              </div>
            </div>
          </div>
        )}
        {user?.rankID && (
          <div className="rank-info-grid">
            <div className="cart">
              <div className="profile-pic-section">
                <div className="img">
                  <div className="main">
                    {!user?.rankID?.profilePicture && <FaRegUserCircle />}
                    {user?.rankID?.profilePicture && (
                      <img
                        src={getImageUrl(user?.rankID?.profilePicture)}
                        alt=""
                      />
                    )}
                  </div>
                  <img src={star} alt="" className="star" />
                </div>
                <p>{user?.rankID?.rank}</p>
              </div>
              <div className="des-section">
                <div className="list-item">
                  <strong>নাম:</strong>
                  <p>{user?.rankID?.name}</p>
                </div>
                <div className="list-item">
                  <strong>একাউন্ট নম্বর:</strong>
                  <p>{user?.rankID?.accountNumber}</p>
                </div>
                <div className="list-item">
                  <strong>মোবাইল নম্বর:</strong>
                  <p>{user?.rankID?.phoneNumber}</p>
                </div>
                <div className="list-item">
                  <strong>জেলা:</strong>
                  <p>{user?.rankID?.district}</p>
                </div>
                <div className="list-item">
                  <strong>থানা:</strong>
                  <p>{user?.rankID?.thana}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankHistory;
