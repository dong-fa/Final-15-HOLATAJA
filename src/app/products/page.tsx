'use client';

import Carousel from '@/components/Carousel';
import Tab, { TabItem } from '@/components/Tab';
import SearchBar from '@/app/products/SearchBar';
import CategoryToggle from '@/app/products/CategoryToggle';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/Typography';

const productList = [
  {
    _id: 1,
    imageSrc: '/product_images/nuphy_air60/nuphy_air60_lunagray_detail_01.webp',
    title: 'NUPHY AIR60 V2 기계식 키보드 청축 블루투스 유/무선 미니 컴팩트 60% 레이아웃 RGB 백라이트 게이밍 키보드',
    price: 119000,
    category: 'BLUE',
  },
  {
    _id: 2,
    imageSrc: '/carousel_images/carousel-image9.webp',
    title: '로지텍 MX Keys Mini 무선 키보드',
    price: 89000,
    category: 'OTHER',
  },
  {
    _id: 3,
    imageSrc: '/carousel_images/carousel-image11.webp',
    title: '애플 매직 키보드 한국어',
    price: 129000,
    category: 'OTHER',
  },
  {
    _id: 4,
    imageSrc: '/carousel_images/carousel-image12.webp',
    title: '레이저 헌츠맨 V3 Pro 게이밍 키보드 광축 RGB 백라이트 유선 기계식 키보드 프리미엄 모델',
    price: 199000,
    category: 'OTHER',
  },
  {
    _id: 5,
    imageSrc: '/carousel_images/carousel-image4.webp',
    title: 'NUPHY AIR60 V2 기계식 키보드 청축 블루투스 유/무선 미니 컴팩트 60% 레이아웃 RGB 백라이트 게이밍 키보드',
    price: 119000,
    category: 'BLUE',
  },
  {
    _id: 6,
    imageSrc: '/carousel_images/carousel-image11.webp',
    title: '로지텍 MX Keys Mini 무선 키보드',
    price: 89000,
    category: 'OTHER',
  },
  {
    _id: 7,
    imageSrc: '/carousel_images/carousel-image9.webp',
    title: '애플 매직 키보드 한국어',
    price: 129000,
    category: 'RED',
  },
  {
    _id: 8,
    imageSrc: '/carousel_images/carousel-image11.webp',
    title: '레이저 헌츠맨 V3 Pro 게이밍 키보드 광축 RGB 백라이트 유선 기계식 키보드 프리미엄 모델',
    price: 199000,
    category: 'BROWN',
  },
];

export default function ProductPage() {
  // Tab category에 맞게 content 만들어주는 함수
  function getTabContent(category: string) {
    const filtered = productList.filter(product => product.category === category);
    return (
      <>
        <SearchBar />
        <CategoryToggle />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filtered.map((product, index) => (
            <ProductCard key={index} _id={product._id} imageSrc={[product.imageSrc]} title={product.title} price={product.price} />
          ))}
        </div>
      </>
    );
  }

  // quantity 1 이상, 축 분류에 맞는 제품 가져오기
  const tabItems: TabItem[] = [
    { id: 'BLUE', title: '청축(Click Tactile)', content: getTabContent('BLUE') },
    { id: 'BROWN', title: '갈축(Soft Tactile)', content: getTabContent('BROWN') },
    { id: 'RED', title: '적축(Linear)', content: getTabContent('RED') },
    { id: 'OTHER', title: '기타', content: getTabContent('OTHER') },
  ];

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
