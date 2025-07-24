'use client';

import ProductImg from '@/components/ProductImg';

interface ProductCardProps {
  _id: number;
  imageSrc: string;
  title: string;
  price: number;
}

// 상품의 id/이미지경로/상품명/가격을 props로 받아서 동작
// id는 Link 연결할 때 사용 예정
export default function ProductCard({ _id, imageSrc, title, price }: ProductCardProps) {
  const formatPrice = price.toLocaleString();

  return (
    <div className="w-full h-60 md:h-64 rounded">
      <div className="w-full h-40 md:h-44 rounded-lg relative bg-white">
        <ProductImg title={title} srcList={[imageSrc]} />
      </div>
      <h3 className="text-sm sm:text-md text-gray-700 leading-5 line-clamp-2 webkit-line-clamp-2">
        {_id}.{title}
      </h3>
      <p className="font-bold pb-3">{formatPrice}원</p>
    </div>
  );
}
