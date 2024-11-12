import React from "react";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import "./Footer.scss";
import bkash from "../../assets/footer/bkash.png";
import visa from "../../assets/footer/visa.png";
import mastercard from "../../assets/footer/mastercard.png";
import amiricanExpress from "../../assets/footer/amiricanExpress.png";
import nagad from "../../assets/footer/nagad.png";
import { FaMap, FaPhoneAlt } from "react-icons/fa";

const pagymentList = [
  {
    img: bkash,
  },
  {
    img: visa,
  },
  {
    img: mastercard,
  },
  {
    img: amiricanExpress,
  },
  {
    img: nagad,
  },
];

const Footer = () => {
  return (
    <div className="footer-section pt-5">
      <div className="inner-container">
        <div className="contact-section">
          <h6>Contact Us</h6>
          <ul className="items">
            <li>
              <SiGmail /> www.easyshop50@gmail.com
            </li>
            <li>
              <FaPhoneAlt /> 01906705620
            </li>
            <li>
              <FaMap /> Barisal, kathalia Jhalokati
              Hospital Road Amua
            </li>
          </ul>
        </div>
        <div className="payment-section">
          <h6>We Accept</h6>
          <div className="payment-list">
            {pagymentList.map((item, index) => {
              return (
                <div>
                  <img src={item.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="social-section">
          <h6>Contact Us</h6>
          <div className="social-list">
            <a
              href="https://www.facebook.com/Easy-Shop-50-Official-103979879094789"
              target="framename"
              className="facebook"
            >
              <BsFacebook />
            </a>
            <a
              href="https://twitter.com/Easy_Shop50?t=t6p34Vgg_F5TV2T-M_DjPg&s=07&fbclid=IwAR06cJ89wKg7SOaxGBaKuHqfgFjtMsKDFn10IWC-E0BHGfPcCi9TdrLWPIk"
              target="framename"
              className="twiter"
            >
              <BsTwitter />
            </a>
            <a href="" target="framename" className="instagram">
              <AiFillInstagram />
            </a>
            <a
              href="https://www.youtube.com/channel/UCDovAQKPxwUhEwsnAppw7oQ"
              target="framename"
              className="youtube"
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
