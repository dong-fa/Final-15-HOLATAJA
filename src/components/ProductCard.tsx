'use client';

interface ProductCardProps {
  image: React.ReactNode;
  title: string;
  price: number;
}

export default function ProductCard({ image, title, price }: ProductCardProps) {
  // 가격 세자리마다 , 붙여서 표시해주는 함수
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  return (
    <div className="w-full h-60 md:h-64 mx-auto">
      <div className="w-full h-[70%] rounded relative">{image}</div>
      <h3 className="text-xs md:text-sm text-gray-700 leading-5 line-clamp-2 webkit-line-clamp-2">{title}</h3>
      <p className="font-bold pb-3">{formatPrice(price)}</p>
    </div>
  );
}
