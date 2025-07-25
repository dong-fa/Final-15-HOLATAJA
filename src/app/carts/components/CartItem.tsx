'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/Button';
import QuantityCount from '@/components/QuantityCount';

// 장바구니 개별 상품 아이템의 Props 타입 정의
interface CartItemProps {
  id: string; // 상품 고유 ID
  name: string; // 상품명
  options: string; // 상품 옵션 (색상, 사이즈 등)
  price: number; // 상품 가격
  quantity: number; // 현재 수량
  image: string; // 상품 이미지 경로
  onQuantityChange: (id: string, quantity: number) => void; // 수량 변경 시 호출되는 콜백 함수
  onRemove: (id: string) => void; // 상품 삭제 시 호출되는 콜백 함수
}

export default function CartItem({ id, name, options, price, quantity, image, onQuantityChange, onRemove }: CartItemProps) {
  // 수량 변경 핸들러
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(id, newQuantity);
  };

  // 상품 삭제 핸들러
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-3 sm:mb-4">
      {/* 데스크톱 레이아웃 - 640px 이상: 원본 디자인 그대로 */}
      <div className="hidden sm:flex items-center gap-4 p-4">
        {/* 상품 이미지 */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image src={image} alt={name} width={64} height={64} className="w-full h-full object-cover rounded-lg" priority={false} />
        </div>

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-500">
            옵션: <span className="text-gray-700">{options}</span>
          </p>
        </div>

        {/* 수량 조절 */}
        <div className="flex items-center">
          <QuantityCount quantity={quantity} handleCountQuantity={handleQuantityChange} />
        </div>

        {/* 가격 */}
        <div className="text-right min-w-[120px]">
          <p className="text-lg font-bold text-gray-900">{price.toLocaleString()}원</p>
        </div>

        {/* 삭제 버튼 */}
        <Button icon size="medium" className="text-gray-400 hover:text-gray-600 flex-shrink-0" onClick={handleRemove}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* 모바일 레이아웃 - 639px 이하: 컴팩트한 세로 배치 */}
      <div className="sm:hidden p-3">
        <div className="flex items-center gap-3 mb-2">
          {/* 상품 이미지 */}
          <div className="w-12 h-12 flex-shrink-0">
            <Image src={image} alt={name} width={48} height={48} className="w-full h-full object-cover rounded-lg" priority={false} />
          </div>

          {/* 상품 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{name}</h3>
            <p className="text-xs text-gray-500">
              옵션: <span className="text-gray-700">{options}</span>
            </p>
          </div>

          {/* 삭제 버튼 */}
          <Button icon size="medium" className="text-gray-400 hover:text-gray-600 flex-shrink-0" onClick={handleRemove}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 수량 조절과 가격 - 하단 */}
        <div className="flex items-center justify-between">
          <QuantityCount quantity={quantity} handleCountQuantity={handleQuantityChange} />
          <p className="text-base font-bold text-gray-900">{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}
