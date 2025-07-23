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
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// 상품 상세 reponse
interface DataResProps {
  ok: number;
  item: DataProps;
}

// 상품 상세 item
interface DataProps {
  _id: number;
  price: number;
  quantity: number;
  name: string;
  content: string;
  show: boolean;
  active: boolean;
  mainImages: {
    type: 'detail' | 'info';
    originalname: string;
    name: string;
    path: string;
  }[];
  extra: {
    isNew: boolean;
    category: 'BLUE' | 'BROWN' | 'RED' | 'OTHER';
    option: string[];
    description: string;
    'function-tag': string[];
    'soundfile-path': string;
  };
  shippingFees: number;
  seller_id: number;
  buyQuantity: number;
  createdAt: string;
  updatedAt: string;
  seller: {
    _id: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    extra: {
      birthday: string;
      address: { id: number; name: string; value: string }[];
    };
  };
  replies: {
    _id: number;
    rating: number;
    content: string;
    user_id: number;
    user: {
      _id: number;
      name: string;
      image: null;
    };
    createdAt: '2025.07.17 11:16:18';
  }[];
  bookmarks: number;
  options: [];
}

// 상품 구매 시 전달할 정보
const purchaseData = [];

function ProductInfo() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams().id;
  const axios = useAxiosInstance();

  const [data, setData] = useState<DataProps | null>(null);
  const [quantity, setQuantity] = useState(0);

  const tabItems: TabItem[] = [
    {
      id: '1',
      title: '제품 상세 정보',
      content: (
        <div className="flex flex-col gap-6 px-4 sm:gap-12">
          <div>
            <ContentsTitle className="mb-4">제품 소개</ContentsTitle>
            <p>{data?.extra.description}</p>
          </div>
          <div>
            <ContentsTitle className="mb-4">기능</ContentsTitle>
            <ul className="grid gap-2 sm:gap-4 sm:grid-cols-3">
              {/* {data?.extra['function-tag'].map((tag, idx) => (
                <li key={idx} className="flex items-center justify-center h-16 gap-2 p-4 font-semibold bg-white border rounded-lg border-lightgray">
                  <KeyRound />
                  <div>tag</div>
                </li>
              ))} */}
            </ul>
          </div>
          <div className="rounded-lg bg-lightgray">
            <SoundToggle />
            <div>{/* 키보드 */}</div>
          </div>
          {(data?.mainImages.filter(img => img.type === 'info').map(img => API_URL + '/' + img.path) ?? []).map((img, idx) => (
            <div key={idx} className="relative w-full">
              <Image src={img} alt="" width={0} height={0} priority sizes="100%" className="w-full h-auto object-scale-down" />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: '2',
      title: '구매 후기',
      content: (
        <>
          <div className="flex flex-col gap-4 mb-6 sm:mb-12">
            {data?.replies.map((reply, idx) => (
              <ReviewCard
                key={idx}
                name="박동건"
                createdAt="2025.03.14 20:07:54"
                rating={4}
                content="처음으로 num 키 없는 키보드를 사봤는데요, num키가 문제가 아니라 이 키보드 방향키가 왜 이모양이죠???? 
크아하다가 역주행 8번 했네요.
아 잘 보고 살걸... 제가 마음이 여린 편이라 별점은 4점 드립니다..."
              ></ReviewCard>
            ))}
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

  // 상품 상세 조회
  const getData = async () => {
    try {
      const response = await axios.get<DataResProps>(`/products/${params}`);
      setData(response.data.item);
    } catch (error) {
      console.error(error);
    }
  };

  // 상품 구매 후기 목록 조회

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <Title>상품 상세</Title>
      <div className="grid sm:grid-cols-2 gap-9">
        <ProductImg
          title={data?.name ?? ''}
          srcList={data?.mainImages.filter(img => img.type === 'detail').map(img => API_URL + '/' + img.path) ?? []}
          swipe
        ></ProductImg>
        <div className="flex flex-col self-center gap-4">
          <div>
            <SubTitle className="mb-2">{data?.name ?? ''}</SubTitle>
            <p className="text-secondary">{data?.content}</p>
          </div>
          <div>
            <span className="text-2xl font-bold">{data?.price.toLocaleString()}원</span>
          </div>
          <div>
            <span className="inline-block mb-2 font-semibold">옵션</span>
            <div className="flex gap-2">
              {data?.extra.option.map((option, idx) => (
                <Button key={idx} size="medium" select>
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <QuantityCount handleCountQuantity={num => setQuantity(num)} quantity={quantity} />
            <div className="flex flex-row gap-2 sm:gap-4">
              <Button outlined size="full">
                장바구니
              </Button>
              <Button size="full">구매하기</Button>
            </div>
          </div>
        </div>
      </div>
      <Tab tabItems={tabItems} />
    </div>
  );
}

export default ProductInfo;
