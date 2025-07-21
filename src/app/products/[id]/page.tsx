'use client';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import Pagination from '@/components/Pagination';
import ProductImg from '@/components/ProductImg';
import QnA from '@/components/QnA';
import QuantityCount from '@/components/QuantityCount';
import ReviewCard from '@/components/ReviewCard';
import Select from '@/components/Select';
import SoundToggle from '@/components/SoundToggle';
import Tab, { TabItem } from '@/components/Tab';
import Textarea from '@/components/Textarea';
import { Contents, ContentsTitle, SubTitle, Title } from '@/components/Typography';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import { KeyRound, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// 상품 상세 데이터 reponse
interface DataResProps {
  ok: number;
  item: DataProps;
}

// 상품 상세 데이터 item
interface DataProps {
  name: string;
  price: string;
}

// 상품 상세 정보
const data = {
  _id: 1,
  seller_id: 2,
  price: 219000,
  shippingFees: 3000,
  show: true,
  active: true,
  name: 'NUPHY AIR96 V2 기계식 키보드 청축 블루투스 무선 유선 풀배열 슬림형',
  quantity: 300,
  buyQuantity: 12,
  mainImages: [
    {
      path: 'files/febc13-final15-emjf/nuphy_air96_lunagray_detail_01.webp',
      name: 'nuphy_air96_lunagray_detail_01.webp',
      originalname: 'AIR96',
    },
    {
      path: 'files/febc13-final15-emjf/nuphy_air96_lunagray_detail_02.webp',
      name: 'nuphy_air96_lunagray_detail_02.webp',
      originalname: 'AIR96',
    },
    {
      path: 'files/febc13-final15-emjf/nuphy_air96_lunagray_detail_03.webp',
      name: 'nuphy_air96_lunagray_detail_03.webp',
      originalname: 'AIR96',
    },
  ],
  createdAt: '2025.07.10 15:07:54',
  updatedAt: '2025.07.12 01:07:54',
  extra: {
    isNew: false,
  },
  seller: {
    _id: 2,
    email: 's1@market.com',
    name: '네오',
    phone: '01022223333',
    address: '서울시 강남구 삼성동 456',
    image: '/files/febc13-final15-emjf/user-neo.png',
    extra: {
      birthday: '11-23',
    },
  },
  replies: [
    {
      _id: 7,
      rating: 1,
      content: '키보드에 커피를 쏟았어요',
      user_id: 5,
      user: {
        _id: 5,
        name: '희정',
        image: null,
      },
      createdAt: '2025.07.17 11:16:18',
    },
    {
      _id: 8,
      rating: 5,
      content: '강아지가 좋아해요',
      user_id: 5,
      user: {
        _id: 5,
        name: '희정',
        image: null,
      },
      createdAt: '2025.07.17 11:47:50',
    },
  ],
  rating: 3,
  bookmarks: 1,
  options: [],
};

// 상품 구매 시 전달할 정보
const purchaseData = [];

function ProductInfo() {
  // const [data, setData] = useState<DataProps | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedValue, setSelectedValue] = useState();

  const axios = useAxiosInstance();

  const tabItems: TabItem[] = [
    {
      id: '1',
      title: '제품 상세 정보',
      content: (
        <div className="flex flex-col gap-12 px-4">
          <div>
            <ContentsTitle className="mb-4">제품 소개</ContentsTitle>
            <p>제품 소개글</p>
          </div>
          <div>
            <ContentsTitle className="mb-4">기능</ContentsTitle>
            <ul className="grid grid-cols-3 gap-4">
              <li className="flex items-center justify-center h-16 gap-2 font-semibold border rounded-lg border-lightgray">
                <KeyRound />
                <div>Hot-Swappable Switches</div>
              </li>
              <li className="flex items-center justify-center h-16 gap-2 font-semibold border rounded-lg border-lightgray">
                <KeyRound />
                Customizable RGB Lighting
              </li>
              <li className="flex items-center justify-center h-16 gap-2 font-semibold border rounded-lg border-lightgray">
                <KeyRound />
                Compact 75% Layout
              </li>
            </ul>
          </div>
          <div>
            <SoundToggle />
            <div>{/* 키보드 */}</div>
          </div>
          <div>{/* 상세 이미지 */}</div>
        </div>
      ),
    },
    {
      id: '2',
      title: '구매 후기',
      content: (
        <>
          <div className="flex flex-col gap-4 mb-12">
            {' '}
            <ReviewCard
              name="박동건"
              createdAt="2025.03.14 20:07:54"
              rating={4}
              content="처음으로 num 키 없는 키보드를 사봤는데요, num키가 문제가 아니라 이 키보드 방향키가 왜 이모양이죠???? 
크아하다가 역주행 8번 했네요.
아 잘 보고 살걸... 제가 마음이 여린 편이라 별점은 4점 드립니다..."
            ></ReviewCard>
            <ReviewCard
              name="박동건"
              createdAt="2025.03.14 20:07:54"
              rating={2}
              content="처음으로 num 키 없는 키보드를 사봤는데요, num키가 문제가 아니라 이 키보드 방향키가 왜 이모양이죠???? 
크아하다가 역주행 8번 했네요.
아 잘 보고 살걸... 제가 마음이 여린 편이라 별점은 4점 드립니다..."
            ></ReviewCard>
            <ReviewCard
              name="박동건"
              createdAt="2025.03.14 20:07:54"
              rating={1}
              content="처음으로 num 키 없는 키보드를 사봤는데요, num키가 문제가 아니라 이 키보드 방향키가 왜 이모양이죠???? 
크아하다가 역주행 8번 했네요.
아 잘 보고 살걸... 제가 마음이 여린 편이라 별점은 4점 드립니다..."
            ></ReviewCard>
          </div>
          <div className="flex flex-col gap-4">
            <Contents size="large">구매 후기 등록하기</Contents>
            <div className="flex">
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
            </div>
            <Textarea name="" id="" />
            <div className="flex justify-end">
              <Button size="small">문의하기</Button>
            </div>
          </div>
        </>
      ),
    },
    {
      id: '3',
      title: 'Q&A',
      content: (
        <>
          <QnA />
          <div className="flex flex-col gap-4">
            <label htmlFor="">
              <Contents size="large">구매 후기 등록하기</Contents>
            </label>
            <Textarea id="" name="" />
            <div className="flex justify-end">
              <Button size="small">문의하기</Button>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <Title>상품 상세</Title>
      <div className="grid grid-cols-2 gap-9">
        <ProductImg
          title={data?.name ?? ''}
          srcList={['/product_images/nuphy_halo75/nuphy_halo75_detail_01.webp', '/product_images/nuphy_halo75/nuphy_halo75_detail_02.webp']}
          // srcList={data.mainImages.map(img => img.path)}
          swipe
        ></ProductImg>
        <div className="flex flex-col self-center gap-4">
          <div>
            <SubTitle className="mb-2">{data?.name ?? ''}</SubTitle>
            <p className="text-secondary">상품 설명</p>
          </div>
          <div>
            <span className="text-2xl font-bold">{data?.price.toLocaleString()}원</span>
          </div>
          <div>
            <span className="inline-block mb-2 font-semibold">옵션</span>
            <div className="flex gap-2">
              <Button size="medium" select>
                옵션1
              </Button>
              <Button size="medium" select>
                옵션1
              </Button>
              <Button size="medium" select>
                옵션1
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <QuantityCount handleCountQuantity={num => setQuantity(num)} quantity={0} />
            <Button outlined>장바구니</Button>
            <Button>구매하기</Button>
          </div>
        </div>
      </div>
      <Tab tabItems={tabItems} />
    </div>
  );
}

export default ProductInfo;
