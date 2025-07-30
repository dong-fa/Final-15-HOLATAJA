'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImgProps {
  title: string;
  // 하나의 이미지라도 배열 형태로 전달받음
  srcList: string[];
  swipe?: boolean;
  productId?: number;
  bookmarkId?: number;
}

function ProductImg({ title, srcList, swipe, productId, bookmarkId }: ProductImgProps) {
  const [liked, setLiked] = useState(!!bookmarkId);
  const buttonBg = liked ? 'bg-[#FFCC00]' : 'bg-darkgray';

  useEffect(() => {
    setLiked(!!bookmarkId);
  }, [bookmarkId]);

  return (
    <>
      {swipe ? (
        // 제품 상세에 들어갈 슬라이드형 이미지
        <div className="relative aspect-square" style={{ maxWidth: 'calc(100vw - 2rem - 15px)' }}>
          <button
            className={`${buttonBg} z-10 rounded-full w-[24px] aspect-square text-white flex justify-center items-center absolute bottom-4 right-4 cursor-pointer`}
            onClick={() => setLiked(!liked)}
            type="button"
            aria-label="찜하기"
          >
            <Star fill="#fff" size={16} />
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            pagination={{ clickable: true }}
            className="relative"
          >
            {srcList.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full overflow-hidden rounded-lg aspect-square max-w-screen">
                  {/* alt값 추가 필요 */}
                  <Image src={src} alt={title + '이미지'} fill className="object-cover" sizes="(max-width: 640px) 100vw - 2rem - 15px, 100vw" />
                </div>
              </SwiperSlide>
            ))}
            <button className="rounded-full swiper-button-prev bg-white/80" type="button" aria-label="이전 슬라이드">
              <ChevronLeft size={32} color="var(--color-darkgray)" />
            </button>
            <button className="rounded-full swiper-button-next bg-white/80" type="button" aria-label="다음 슬라이드">
              <ChevronRight size={32} color="var(--color-darkgray)" />
            </button>
          </Swiper>
        </div>
      ) : (
        // 제품 목록에 들어갈 고정형 이미지
        <div className="relative w-full h-full overflow-hidden rounded-lg aspect-square">
          <Link href={`./products/${productId}`} className="relative block w-full h-full">
            <Image
              src={srcList[0]}
              alt={title + '이미지'}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-2"
              sizes="(min-width: 768px) 100vw, 100vw"
            />
          </Link>
          <button
            className={`${buttonBg} rounded-full w-[24px] aspect-square text-white flex justify-center items-center absolute bottom-2.5 right-2.5 cursor-pointer`}
            onClick={() => setLiked(!liked)}
            type="button"
            aria-label="찜하기"
          >
            <Star fill="#fff" size={16} />
          </button>
        </div>
      )}
    </>
  );
}

export default ProductImg;
