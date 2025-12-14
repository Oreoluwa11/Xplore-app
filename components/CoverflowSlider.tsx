"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CoverflowSlider = () => {
  const slides = [
    "/images/image1.jpeg",
    "/images/image2.jpeg",
    "/images/image3.jpeg",
    "/images/image4.jpeg",
    "/images/image5.jpeg",
    "/images/image6.jpeg",
    "/images/image7.jpeg",
    "/images/image8.jpeg",
  ];

  return (
    <div className="w-full flex justify-center  bg-transparent">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-xs md:max-w-sm bg-transparent "
      >
        {slides.map((src, index) => (
          <SwiperSlide
            key={index}
            className="w-32 h-44 sm:w-40 sm:h-56 md:w-52 md:h-72 bg-transparent flex items-center justify-center"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[90%] h-[90%] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoverflowSlider;
