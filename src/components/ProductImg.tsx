'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImgProps {
  src: string;
  swipe?: boolean;
}

// 슬라이드 이미지 배열
const imgList = [
  { id: 1, src: '/image.png' },
  { id: 2, src: '/image2.png' },
];

function ProductImg({ src, swipe }: ProductImgProps) {
  const [liked, setLiked] = useState(false);

  const buttonBg = liked ? 'bg-[#FFCC00]' : 'bg-darkgray';

  return (
    <>
      {swipe ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {imgList.map(img => (
            <SwiperSlide key={img.id}>
              <div className="rounded-lg relative overflow-hidden w-full aspect-square">
                {/* alt값 추가 필요 */}
                <Image src={src} alt="" fill className="object-cover" />
                <button
                  className={`${buttonBg} rounded-full w-6 h-6 text-white flex justify-center items-center absolute bottom-4 right-4 cursor-pointer`}
                  onClick={() => setLiked(!liked)}
                >
                  <Star fill="#fff" size={16} />
                </button>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev">
            <ChevronLeft size={32} />
          </div>
          <div className="swiper-button-next">
            <ChevronRight size={32} />
          </div>
        </Swiper>
      ) : (
        <div className="rounded-lg relative overflow-hidden w-full h-full">
          {/* alt값 추가 필요 */}
          <Image src={src} alt="" fill className="object-cover" />
          <button
            className={`${buttonBg} rounded-full w-6 h-6 text-white flex justify-center items-center absolute bottom-2.5 right-2.5 cursor-pointer`}
            onClick={() => setLiked(!liked)}
          >
            <Star fill="#fff" size={16} />
          </button>
        </div>
      )}
    </>
  );
}

export default ProductImg;
