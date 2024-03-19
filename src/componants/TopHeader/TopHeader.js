import React, { useContext } from 'react';
import './TopHeader.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../App';
import { FaUserCircle, FaWhatsappSquare } from "react-icons/fa";
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import newYearVideo from "../../assets/video/20231223_2145501 (1).mp4"


const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
</svg>
const downArro = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
</svg>
const loginIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
  <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
</svg>


const TopHeader = () => {
  const [user, setUser] = useContext(userContext);



  return (
    <section className="top-header">
      <div className=" ">
        {/* <div className="d-flex justify-content-center top-social ">
          <div className="col-md-4 col-12 text-center py-1 socil top-header-social"> 
            <div>
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
              <a
                href="https://wa.me/+8801906705620"
                target="framename"
                className="whatsapp"
              >
                <FaWhatsappSquare />
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
        </div> */}
        <div className="d-flex justify-content-center align-items-center   top-header-user">
          {user._id ? (
            <NavLink to="/dashboard">
              <FaUserCircle /> {user.firstName} {user.lastName}
            </NavLink>
          ) : (
            <>
              <NavLink to="/registration">{userIcon} Register</NavLink>
              <span>or</span>
              <NavLink to="/login">{loginIcon} Member Login</NavLink>
            </>
          )}
        </div>
      </div>
      <ins
        class="adsbygoogle easyshop_responsive_one"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6382147321235149"
        data-ad-slot="8196240518"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      
    </section>
  );
};

export default TopHeader;