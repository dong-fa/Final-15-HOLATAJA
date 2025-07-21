'use client';

import { useEffect, useMemo, useState } from 'react';

import Carousel from '@/components/Carousel';
import Tab, { TabItem } from '@/components/Tab';
import SearchBar from '@/app/products/SearchBar';
import CategoryToggle from '@/app/products/CategoryToggle';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/Typography';

import useAxiosInstance from '@/hooks/useAxiosInstance';

interface Product {
  _id: number;
  imgSrc: string;
  title: string;
  price: number;
  category: 'ALL' | 'BLUE' | 'BROWN' | 'RED' | 'OTHER';

  // 화면에 표시 안 되는 부분
  quantity: number;
  createdAt: string;
}

interface RawItem {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  options: number;
  replies: number;
  bookmarks: number;
  buyQuantity: number;
  show: boolean;
  active: boolean;
  shippingFees: number;

  extra: {
    category: 'BLUE' | 'BROWN' | 'RED' | 'OTHER';
    isNew: boolean;
  };

  mainImages?: {
    name: string;
    originalname: string;
    path: string;
  }[];

  seller: {
    _id: number;
    seller_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
  };
}

export default function ProductPage() {
  // axios instance
  const axios = useAxiosInstance();
  const [productList, setProductList] = useState<Product[]>([]);

  // DB에서 이미지 binary값 받아와서 url로 변환해주는 함수
  const getImageUrl = async (path: string): Promise<string> => {
    console.log('API 서버에 이미지 파일 요청');
    try {
      const res = await axios.get(path, { responseType: 'blob' }); // blob 형식으로 binary 값 받아오기
      return URL.createObjectURL(res.data); // 브라우저가 이해할 수 있는 Object URL 생성해서 전달
    } catch (err) {
      console.error(err);
      alert('이미지 호출에 실패했습니다.');
    }
    return '';
  };

  // API에서 상품 목록을 불러와 변환 + 이미지 처리 하는 함수
  const fetchProductList = async () => {
    try {
      console.log('API 서버에 목록 정보 요청');
      const res = await axios.get(`/products/`);
      const rawItems = res.data.item;
      console.log(rawItems); // 응답 데이터 확인
      // rawItems.map((item, index) => console.log(item.extra.category[0], index)); // test

      // 받아온 데이터를 Interface에 맞게 변환
      const transformedItems = await Promise.all(
        rawItems.map(async (item: RawItem): Promise<Product> => {
          const imagePath = item.mainImages?.[0]?.path;

          const imageUrl = imagePath ? await getImageUrl(imagePath) : '/product_images/holataja_circle.webp'; // 이미지 없는 경우 기본 로고 이미지 넣기

          return {
            _id: item._id,
            imgSrc: imageUrl,
            title: item.name,
            price: item.price,
            category: item.extra.category,
            quantity: item.quantity,
            createdAt: item.createdAt,
          };
        }),
      );

      // console.log(transformedItems); // 변환 데이터 확인
      setProductList(transformedItems);

      // const res = await axios.get(`/bookmarks/product`);
      // console.log(res);
    } catch (err) {
      console.error(err);
      alert('목록 조회에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  // Tab category에 맞게 content 만들어주는 함수
  function getTabContent(category: Product['category'] | 'ALL') {
    const filtered = category === 'ALL' ? productList : productList.filter(product => product.category === category);
    return (
      <>
        <SearchBar />
        <CategoryToggle />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filtered.map((product, index) => (
            <ProductCard key={index} _id={product._id} imageSrc={[product.imgSrc]} title={product.title} price={product.price} />
          ))}
        </div>
      </>
    );
  }

  const tabItems: TabItem[] = useMemo(
    () => [
      { id: 'ALL', title: '전체 보기', content: getTabContent('ALL') },
      { id: 'BLUE', title: '청축(Click Tactile)', content: getTabContent('BLUE') },
      { id: 'BROWN', title: '갈축(Soft Tactile)', content: getTabContent('BROWN') },
      { id: 'RED', title: '적축(Linear)', content: getTabContent('RED') },
      { id: 'OTHER', title: '기타', content: getTabContent('OTHER') },
    ],
    [productList],
  );

  return (
    <>
      <section className="py-2">
        <Carousel />
      </section>

      <section className="max-w-5xl py-3 mx-auto">
        <Title>상품 목록</Title>

        <Tab tabItems={tabItems} />
      </section>
    </>
  );
}
