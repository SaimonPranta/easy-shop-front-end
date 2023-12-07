import React from 'react';
import { AiFillInstagram, AiFillYoutube, AiTwotonePhone } from 'react-icons/ai';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
    return (
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
    );
};

export default Footer;