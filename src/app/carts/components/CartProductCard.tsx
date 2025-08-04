'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { CartItemData } from '@/types/cart';
import QuantityCount from '@/components/QuantityCount';
// import { ContentsTitle, Contents } from '@/components/Typography';
import Button from '@/components/Button';
import { updateCartItemQuantity } from '@/data/actions/carts';

interface CartProductCardProps {
  item: CartItemData; // 장바구니 아이템 데이터
  handleRemoveItem: (productId: number) => void; // 상품 삭제 콜백
  isDeleting?: boolean; // 삭제 처리 중 상태
  isUpdatingQuantity?: boolean; // 수량 업데이트 중 상태
  token: string;
}

export default function CartProductCard({ item, token, handleRemoveItem, isDeleting = false, isUpdatingQuantity = false }: CartProductCardProps) {
  // 클라이언트에서만 확인 다이얼로그 상태 관리
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // ==================== 유틸리티 함수 ====================

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR');
  };

  const getImageUrl = (): string => {
    if (item.product.image?.path) {
      return `${item.product.image.path}`;
    }
    return '/images/placeholder-product.jpg';
  };

  const totalPrice = item.product.price * item.quantity;

  // ==================== 이벤트 핸들러 ====================

  const cartRemoveItem = (): void => {
    if (isClient) {
      const confirmDelete = window.confirm(`${item.product.name}을(를) 장바구니에서 삭제하시겠습니까?`);
      if (confirmDelete) {
        handleRemoveItem(item._id);
      }
    }
  };

  const handleCountQuantity = async (quantity: number) => {
    try {
      const res = await updateCartItemQuantity(token, item._id, quantity);

      if (res.ok === 1) {
        const matchedItem = res.item.find(cartItem => cartItem._id === item._id);
        if (matchedItem) {
          const newQuantity = matchedItem.quantity;
          setQuantity(newQuantity);
        }
      }
    } catch (err) {
      console.error('수량 변경 중 오류:', err);
    }
  };

  // ==================== 렌더링 ====================

  return (
    <div
      className={`relative py-3 sm:py-6 border-b border-lightgray last:border-b-0 transition-opacity ${isDeleting ? 'opacity-50' : 'opacity-100'}`}
    >
      {/* 삭제 버튼 - 오른쪽 상단 고정 */}
      <Button
        icon={true}
        onClick={cartRemoveItem}
        disabled={isDeleting || isUpdatingQuantity}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10"
        aria-label={`${item.product.name} 상품 삭제`}
      >
        <X size={16} className="sm:w-5 sm:h-5" />
      </Button>

      <div
        className="
        pr-8 sm:pr-10
        grid gap-2 sm:gap-6 items-start sm:items-center
        grid-cols-[auto_1fr] 
        sm:grid-cols-[auto_1fr_auto_auto]
      "
      >
        {/* 상품 이미지 */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-lightgray row-span-2 sm:row-span-1">
          <Image src={getImageUrl()} alt={`${item.product.name} 상품 이미지`} width={96} height={96} className="w-full h-full object-cover" />
        </div>

        {/* 상품 정보 */}
        <div className="min-w-0 overflow-hidden">
          <div className="text-sm sm:text-base text-text truncate">{item.product.name}</div>
          {item.color && <div className="text-xs sm:text-sm text-darkgray truncate">{item.color}</div>}
        </div>

        {/* 수량 조절 */}
        <div
          className="
          scale-75 sm:scale-90 origin-left sm:origin-center
          col-start-2 sm:col-start-3
        "
        >
          <QuantityCount quantity={quantity} handleCountQuantity={handleCountQuantity} />
        </div>

        {/* 가격 */}
        <div
          className="
          text-sm sm:text-base font-bold text-text text-right
          col-start-2 sm:col-start-4
          justify-self-end
        "
        >
          {`${formatPrice(totalPrice)}원`}
        </div>
      </div>

      {/* 로딩 상태 표시 */}
      {(isDeleting || isUpdatingQuantity) && (
        <div className="mt-2 pr-8 sm:pr-10">
          <p className="text-primary text-xs sm:text-sm">
            <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 border border-primary border-t-transparent rounded-full animate-spin mr-1 sm:mr-2"></span>
            {isDeleting ? '삭제 처리 중...' : '수량 변경 중...'}
          </p>
        </div>
      )}
    </div>
  );
}
