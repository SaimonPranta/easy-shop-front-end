import React, {  useEffect, useState } from "react";
import "./styles.scss";
import {  FaRegUserCircle, FaUsers } from "react-icons/fa";
import star from "../../../../assets/images/star.png";
import getImageUrl from "../../../../shared/functions/getImageUrl";
import { userHeader } from "../../../../shared/cooki";

const RankHistory = () => {
  const [leaders, setLeaders] = useState([])


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/ranks`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLeaders(data.data);
        }
      });
  }, []);

  return (
    <div className="rank-leaders">
      <div className="inner-container">
        <div className="title-section">
          <h4 className="dashboard-title">Rank Leaders</h4>
        </div>
        <div className="grid-section">
          <div className="cart">
            <div className="img-section">
              <FaUsers />
            </div>
            <div className="des-section">
              <p>Ranks Leaders</p>
              <h6>{leaders.length}</h6>
            </div>
          </div>
        </div>

        
        {leaders.length > 0 && (
          <div className="rank-info-grid">
            {
              leaders.map((leaderInfo, index) => {
                return <div className="cart">
                <div className="profile-pic-section">
                  <div className="img">
                    <div className="main">
                      {!leaderInfo?.profilePicture && <FaRegUserCircle />}
                      {leaderInfo?.profilePicture && (
                        <img
                          src={getImageUrl(leaderInfo?.profilePicture)}
                          alt=""
                        />
                      )}
                    </div>
                    <img src={star} alt="" className="star" />
                  </div>
                  <p>{leaderInfo?.rank}</p>
                </div>
                <div className="des-section">
                  <div className="list-item">
                    <strong>নাম:</strong>
                    <p>{leaderInfo?.name}</p>
                  </div>
                  <div className="list-item">
                    <strong>একাউন্ট নম্বর:</strong>
                    <p>{leaderInfo?.accountNumber}</p>
                  </div>
                  <div className="list-item">
                    <strong>মোবাইল নম্বর:</strong>
                    <p>{leaderInfo?.phoneNumber}</p>
                  </div>
                  <div className="list-item">
                    <strong>জেলা:</strong>
                    <p>{leaderInfo?.district}</p>
                  </div>
                  <div className="list-item">
                    <strong>থানা:</strong>
                    <p>{leaderInfo?.thana}</p>
                  </div>
                </div>
              </div>
              } )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default RankHistory;
