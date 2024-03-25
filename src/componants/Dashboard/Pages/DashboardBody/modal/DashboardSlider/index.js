import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./style.scss"
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Index = () => {
    const [slider, setSlider] = useState(["https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"]);

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/slider_provider`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setSlider(data)
    //         })
    // }, [])


    return (
        <div className="dashboard-slider">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    slider.map((item, index) => {
                        
                        return <SwiperSlide><img src={item} alt='' /></SwiperSlide>
                    })
                }
            </Swiper>
        </div >
    );
};

export default Index;