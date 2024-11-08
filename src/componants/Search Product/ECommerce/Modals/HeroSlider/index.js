import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.scss";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import getImageUrl from "../../../../../shared/functions/getImageUrl";

export default function App({ slider, sliderLoading }) {
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
        {slider.map((imgInfo, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="slid-item">
                <img src={getImageUrl(imgInfo.img)} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
        {sliderLoading && (
          <SwiperSlide>
            <div className="slid-item-skeleton">
              <span className="img" />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
