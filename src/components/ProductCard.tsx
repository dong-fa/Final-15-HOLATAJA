'use client';

const ProductList = [
  {
    title: 'NUPHY AIR60 V2 기계식 키보드 정축 블루투스 유/무선 미니 컴팩트 60% 레이아웃 RGB 백라이트 게이밍 키보드',
    price: 119000,
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    title: '로지텍 MX Keys Mini 무선 키보드',
    price: 89000,
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    title: '애플 매직 키보드 한국어',
    price: 129000,
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    title: '레이저 헌츠맨 V3 Pro 게이밍 키보드 광축 RGB 백라이트 유선 기계식 키보드 프리미엄 모델',
    price: 199000,
    image: '/placeholder.svg?height=200&width=200',
  },
];

export default function ProductCard() {
  return (
    <div className="w-50 h-60 md:w-56 md:h-64 mx-auto">
      <div className="w-full h-[70%] rounded border">이미지 자리입니다</div>
      <h3 className="text-sm text-gray-700 leading-5 line-clamp-2 webkit-line-clamp-2">
        NUPHY AIR60 V2 기계식 키보드 청축 블루투스 유/무선 미니미니 키보드
      </h3>
      <p className="font-bold pb-3">119,000원</p>
    </div>
  );
}
