import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";
import { Pagination } from "swiper/modules";
import getImageUrl from "../../../../../shared/functions/getImageUrl";

 
export default function App({categories}) {
  return (
    <>
      <Swiper
        slidesPerView={10}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          // Small tablets
          // 640: {
          //   slidesPerView: 4,
          //   spaceBetween: 15,
          // },
          // Large tablets
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          // Small desktops
          1024: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          // Large desktops
          1440: {
            slidesPerView: 8,
            spaceBetween: 30,
          },
          // Extra-large screens
          1920: {
            slidesPerView: 10,
            spaceBetween: 30,
          },
        }}

        modules={[Pagination]}
        className="category-creosol"
      >
        {categories.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="categories-cart">
                <img src={getImageUrl(item.img)} alt="" />
                <p>{item.label}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
