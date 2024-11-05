import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";
import { Pagination } from "swiper/modules";

const cetegoriesList = [
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
  {
    img: "https://img.drz.lazcdn.com/static/bd/p/0d7e9c8d49935588a7e5bbe13fcf6013.jpg_170x170q80.jpg",
    label: "Earn Coins",
  },
];
export default function App() {
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
        {[...cetegoriesList, ...cetegoriesList, ...cetegoriesList, ...cetegoriesList].map((item, index) => {
          return (
            <SwiperSlide>
              <div className="categories-cart">
                <img src={item.img} alt="" />
                <p>{item.label}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
