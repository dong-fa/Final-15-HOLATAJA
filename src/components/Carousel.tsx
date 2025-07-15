"use client";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slideData = [
  {
    src: "/carousel_images/carousel-image1.webp",
    position: "justify-end items-end", // 우하
    title: "KICK75", 
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-black text-background",
  },
  {
    src: "/carousel_images/carousel-image2.webp",
    position: "justify-center items-center", // 중앙
    title: "AIR96 V2",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-background text-black",
  },
  {
    src: "/carousel_images/carousel-image3.webp",
    position: "justify-start items-end", // 우상
    title: "AIR75 V2",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-black text-background",
  },
  {
    src: "/carousel_images/carousel-image4.webp",
    position: "justify-center items-start", // 좌중
    title: "BH65 FULL ALUMINUM",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-background text-black",
  },
  {
    src: "/carousel_images/carousel-image5.webp",
    position: "justify-center items-center", // 중앙
    title: "Halo65 HE",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-black text-background",
  },
  {
    src: "/carousel_images/carousel-image6.webp",
    position: "justify-end items-start", // 좌하
    title: "AIR75 HE",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-background text-black",
  },
  {
    src: "/carousel_images/carousel-image10.webp",
    position: "justify-center items-center", // 중앙
    title: "Halo75 V2",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-black text-background",
  },
    {
    src: "/carousel_images/carousel-image12.webp",
    position: "justify-center items-end", // 우중
    title: "AIR60 V2",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-black text-background",
  },
  {
    src: "/carousel_images/carousel-image8.webp",
    position: "justify-center items-center", // 중앙
    title: "Field75 HE",
    description: "Craft Your Perfect Keyboard",
    link: "/",
    buttonStyle: "bg-background text-black",
  },
];

export default function Carousel() {
  return (
    <div className="swiper w-full h-full relative">
      <Swiper 
      modules={[Navigation, Pagination, Autoplay]} 
      loop={true} 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        { slideData.map((slide, i) => (
          <SwiperSlide key={ i }>
            <div className="relative w-full h-[20rem]">
              <Image
                src={ slide.src }
                alt={ `올라타자 메인 이미지${ i + 1 }` }
                className="w-full h-full object-cover object-center"
                fill
              />
              <div className="absolute inset-0 bg-black/15">
                <div className="absolute inset-0 flex justify-center items-center px-6">
                  <div
                    className={`flex flex-col text-white font-bold z-10 max-w-5xl w-full
                                ${slide.position}`}
                  >
                    <h1 className="sr-only">Hero section title</h1>
                    <p className="title text-background text-4xl">{slide.title}</p>
                    <p className="contents text-background">{slide.description}</p>
                    <Link
                      className={`${slide.buttonStyle} px-5 py-2 mt-5 rounded cursor-pointer w-fit`}
                      href={slide.link}
                    >
                      상세 페이지로 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
