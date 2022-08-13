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









const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className='about-body text-center py-md-3 py-1'>
                <div className='container'>
                    <h6>DON’T LOOK FURTHER, HERE IS THE KEY</h6>
                    <h5>We’re trusted solution</h5>
                    <p>
                        What is Easy Shop 50? This is basically an online marketing company or e-commerce site from where we can shop online. Like Daraj, Evali, Ajkerdil, this is also a trusted marketing company. This company has again given an opportunity to the students and unemployed of our country to earn. How to make income from Easy Shop 50? We already know that Easy Shop 50 is an e-commerce site but that company has given them the opportunity to make smart income through their company for the promotion or popularity of starting a new business. Here you can earn income by referring. Now you may be wondering why the company will pay only if you refer? In fact, by making this referral, you are promoting this company to thousands of people. In other words, you are informing people about the company's site, so you can earn money from them. I hope I have understood.
                    </p>
                </div>
            </div>
            <div className='about-footer '>
                <div className=' row m-auto'>
                    <div className='col-md-4 col-6 text-center location'>
                        <h6>Where We Are</h6>
                        <span><MdLocationPin /> Barisal, kathalia Jhalokati
                            Hospital Road Amua</span>
                    </div>
                    <div className='col-md-4 col-6 text-center contact'>
                        <h6>Contact Us</h6>
                        <span className='phone'><AiTwotonePhone /> Phone: 01832423219</span> <br />
                        <span className='gmail'><SiGmail /> Gmail: someone@gmail.com</span>
                    </div>
                    <div className='col-md-4 col-12 text-center socil'>
                        <h6>Follow Us</h6>
                        <div>
                            <span className='facebook'><BsFacebook /></span>
                            <span className='twiter'><BsTwitter /></span>
                            <span className='instagram'><AiFillInstagram /></span>
                            <span className='youtube'><AiFillYoutube /></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;