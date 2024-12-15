import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Header from "../Header/Header";
import DisplayAdsOne from "../../GoogleADs/DisplayAdsOne";
import MultiplexAdsOne from "../../GoogleADs/MultiplexAdsOne";
import supportImage from "../../assets/images/support/support.png";
import { MdFileCopy } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import SuccessTost from "../../shared/components/SuccessTost/SuccessTost";
import { configContext } from "../../App";


const Index = () => {
  const [socialList, setSocialList] = useState([]);
  const [config] = useContext(configContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/helpline-social`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSocialList(data.data);
        }
      });
  }, []);
  const handleCopyBtn = (text) => {
    navigator.clipboard.writeText(text);
    SuccessTost("Successfully copied");
  };

  return (
    <div className="helpline-section">
      <Header />
      {/* <TopHeader /> */}
      <DisplayAdsOne />
      <MultiplexAdsOne />
      <div className="main-container">
        <div className="title">
          <h3>Help Line</h3>
        </div>
        <div className="helpline-hero-section">
          <img src={supportImage} alt="" />
          <p>
            {
                config?.headline?.title || ""
            }
          </p>
        </div>
      </div>
      {socialList.length > 0 && (
        <div className="social-container">
          <div className="inner-container single-item">
            {socialList.slice(0, 1).map((info) => {
              return (
                <div className="cart-container">
                  <img
                    src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info.img}`}
                    alt=""
                  />
                  <div className="title-container">
                    <p className="label">{info.label}</p>
                    {info.phoneNumber && (
                      <p>
                        {info.phoneNumber}
                        <button onClick={() => handleCopyBtn(info.phoneNumber)}>
                          <MdFileCopy />
                        </button>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      window.location.replace(info.link);
                    }}
                  >
                    {info.buttonName}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {socialList.length > 1 && (
        <div className="social-container">
          <div className="inner-container">
            {socialList.slice(1, socialList.length).map((info) => {
              return (
                <div className="cart-container">
                  <img
                    src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info.img}`}
                    alt=""
                  />
                  <div className="title-container">
                    <p className="label">{info.label}</p>
                    {info.phoneNumber && (
                      <p>
                        {info.phoneNumber}
                        <button onClick={() => handleCopyBtn(info.phoneNumber)}>
                          <MdFileCopy />
                        </button>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      window.location.replace(info.link);
                    }}
                  >
                    {info.buttonName}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* <div className="main-container">
        <div className="helpline-hero-section">
          <button> Notice </button>
          <p>কেউ যদি ভুল তথ্য দেন তার একাউন্ট করে দেওয়া হবে।</p>
        </div>
      </div> */}

      <ToastContainer />
    </div>
  );
};

export default Index;
