import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.scss";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        // pagination={true}
        // loop={true}
        // modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="e-commerce-hero-section"
      >
        {new Array(10).fill("").map((imgk, index) => {
          return (
            <SwiperSlide>
              <div className="slid-item">
                <img src="https://img.lazcdn.com/us/domino/1899da97-25ef-420b-8784-f3cc58ae088a_BD-1976-688.jpg_2200x2200q80.jpg" alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
