import React from "react";
import './Slider.css';
import { Carousel } from "react-bootstrap";

import slider_img_1 from '../../../assets/images/slider_img/black-friday-shopping-bag-yellow-copy-space-background_23-2148665780.webp';
import slider_img_2 from '../../../assets/images/slider_img/shopping-cart-wooden-sign-orange-bright-light-67629071.jpg';
import slider_img_3 from '../../../assets/images/slider_img/shopping-sign-orange-cart-wooden-68498907.jpg';

const Slider = () => {
    return (
        <section className=' slider-section'>
            <Carousel>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={slider_img_1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={slider_img_2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={slider_img_3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </section>
    );
};

export default Slider;