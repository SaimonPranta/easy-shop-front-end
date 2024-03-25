import React, { useContext } from 'react';
import './TopHeader.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../App';
import { FaUserCircle , FaUserPlus, FaUser} from "react-icons/fa";



 
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
              <NavLink to="/registration"><FaUserPlus/> Register</NavLink>
              <span>or</span>
              <NavLink to="/login"><FaUser/> Member Login</NavLink>
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