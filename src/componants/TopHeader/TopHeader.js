import React, { useContext } from 'react';
import './TopHeader.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../App';
import { FaUserCircle , FaUserPlus, FaUser} from "react-icons/fa";



 



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
              <NavLink to="/login"><FaUser/> Login</NavLink>
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