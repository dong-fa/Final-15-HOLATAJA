'use client';

import CategoryToggle from '@/app/products/components/CategoryToggle';
import SearchBar from '@/app/products/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import Tab, { TabItem } from '@/components/Tab';
import { Product, ProductInfo } from '@/types/product';
import { PackageX } from 'lucide-react';
import React, { useState } from 'react';

export default function ProductList({ productData }: { productData: Product[] }) {
  // 검색어
  const [searchValue, setSearchValue] = useState('');

  // Tab category에 맞게 content 생성해주는 함수
  function getTabContent(category: Product['category'] | 'ALL') {
    let filtered = category === 'ALL' ? productData : productData.filter(product => product.category === category);

    // 검색어 입력 시 일치하는 상품 목록 생성해주는 함수
    filtered = searchValue.trim() === '' ? productData : productData.filter(product => product.name.includes(searchValue.trim()));

    return (
      <>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <CategoryToggle />
        {filtered.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-h-[40vh]">
            {filtered.map((product, index) => (
              <ProductCard
                key={index}
                _id={product._id}
                imageSrc={product.imgSrc}
                title={product.name}
                price={product.price}
                bookmarkId={product.bookmarkId}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto min-h-[40vh] text-darkgray">
            <PackageX className="mb-4" />
            <p>상품을 찾을 수 없습니다.</p>
          </div>
        )}
      </>
    );
  }

  const tabItems: TabItem[] = [
    { id: 'ALL', title: '전체 보기', content: getTabContent('ALL') },
    { id: 'BLUE', title: '청축(Click Tactile)', content: getTabContent('BLUE') },
    { id: 'BROWN', title: '갈축(Soft Tactile)', content: getTabContent('BROWN') },
    { id: 'RED', title: '적축(Linear)', content: getTabContent('RED') },
    { id: 'OTHER', title: '기타', content: getTabContent('OTHER') },
  ];

  return <Tab tabItems={tabItems} />;
}
