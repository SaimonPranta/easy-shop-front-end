import React, { useEffect, useState } from "react";
import './Slider.css';
import { Carousel } from "react-bootstrap";


const Slider = () => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/slider_provider?tab="work-slider"`)
            .then(res => res.json())
            .then(data => {
                setSlider(data)
            })
    }, [])


    return (
        <section className='slider-section'>
            <Carousel>
                {
                    slider?.length > 0 && slider.map((image, index) => {
                        return <Carousel.Item key={index} interval={5000} >
                            <img
                                className="d-block"
                                src={`${process.env.REACT_APP_SERVER_HOST_URL}/${image.img}`}
                                alt={"slider" + index}
                            />
                        </Carousel.Item>
                    })
                }
            </Carousel>
        </section>
    );
};

export default Slider;