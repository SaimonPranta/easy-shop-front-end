import React from 'react';
import Header from '../Header/Header';
import './AboutUs.css';
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import aboutIMG from "../../assets/images/about_img/about.jpg";

const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className='about-body text-center py-1'>
                <div className='container'>
                    <h6>DON’T LOOK FURTHER, HERE IS THE</h6>
                    <h5>Trusted Solution</h5>
                    <p>
                    Easy Shop 50 is basically an online marketing or e-commerce platform where you can buy products and our services. We are sucessfully continuing our business with trust and confidence. We are basically work for students, unemployed, hopeless peapole. We belive in hard work and We also work to make man empowerment. Our plan very simple becouse we never belive in flexible plan which will be very suitable to you. As you know we are an online shop but we made an opportunity for you guys to make income, for this you need to reffer our platform to your friends and familys. Thats all about our platform, hope you will understand our plan and services and you will be connected with our platform.
                    </p>
                </div>
            </div>
            <div className='about-img'>
                <img src={aboutIMG} alt="img" />
            </div>
            <div className='about-footer pt-5'>
                <div className=' row m-auto'>
                    <div className='col-md-4 col-6 text-center location'>
                        <h6>Where We Are</h6>
                        <span><MdLocationPin /> Barisal, kathalia Jhalokati
                            Hospital Road Amua</span>
                    </div>
                    <div className='col-md-4 col-6 text-center contact'>
                        <h6>Contact Us</h6>
                        <span className='phone'><AiTwotonePhone /> Phone: 01906705620</span> <br />
                        <span className='gmail'><SiGmail /> Gmail: www.easyshop50@gmail.com</span>
                    </div>
                    <div className='col-md-4 col-12 text-center socil'>
                        <h6>Follow Us</h6>
                        <div>
                            <a href='https://www.facebook.com/Easy-Shop-50-Official-103979879094789' target="framename" className='facebook'><BsFacebook /></a>
                            <a href='https://twitter.com/Easy_Shop50?t=t6p34Vgg_F5TV2T-M_DjPg&s=07&fbclid=IwAR06cJ89wKg7SOaxGBaKuHqfgFjtMsKDFn10IWC-E0BHGfPcCi9TdrLWPIk' target="framename"  className='twiter'><BsTwitter /></a>
                            <a href='' target="framename" className='instagram'><AiFillInstagram /></a>
                            <a href='https://www.youtube.com/channel/UCDovAQKPxwUhEwsnAppw7oQ' target="framename" className='youtube'><AiFillYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;