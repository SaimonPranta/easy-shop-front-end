import React, { useEffect, useState } from "react";
import './Slider.css';
import { Carousel } from "react-bootstrap";


const Slider = () => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/slider_provider')
            .then(res => res.json())
            .then(data => {
                console.log("ttp://localhost:8000/" + data[0].img)
                setSlider(data)
            })
    }, [])


    return (
        <section className=' slider-section'>
            <Carousel>
                {
                    slider?.length > 0 && slider.map((image, index) => {
                        return <Carousel.Item key={index} interval={5000} >
                            <img
                                className="d-block w-100"
                                src={"http://localhost:8000/" + image.img}
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