import React from 'react';
import { CartTotalCost } from '@/types/cart';
import Button from '@/components/Button';
import { Contents, ContentsTitle } from '@/components/Typography';

interface CartSummaryProps {
  cost?: CartTotalCost;
  onOrderClick: () => void;
  onContinueShoppingClick: () => void;
  itemCount: number;
  isLoading?: boolean;
  isOrderDisabled?: boolean;
}

export default function CartSummary({
  cost,
  onOrderClick,
  onContinueShoppingClick,
  itemCount,
  isLoading = false,
  isOrderDisabled = false,
}: CartSummaryProps) {
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString('ko-KR')}원`;
  };

  const productsCost = cost?.products || 0;

  return (
    <div>
      <div className="bg-white p-6 space-y-4">
        {/* 상품 금액 */}
        <div className="flex justify-between items-center">
          <Contents className="text-secondary">상품 금액</Contents>
          <Contents className="text-secondary">{formatPrice(productsCost)}</Contents>
        </div>

        {/* 배송비 */}
        <div className="flex justify-between items-center">
          <Contents className="text-secondary">배송비</Contents>
          <Contents className="text-secondary">{formatPrice(cost?.shippingFees || 0)}</Contents>
        </div>

        {/* 총 주문금액 */}
        <div className="flex justify-between items-center">
          <ContentsTitle className="text-primary font-bold">총 주문금액</ContentsTitle>
          <ContentsTitle className="text-primary font-bold">{formatPrice(cost?.total || 0)}</ContentsTitle>
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-2">
        <Button outlined size="medium" onClick={onContinueShoppingClick}>
          쇼핑 계속하기
        </Button>
        <Button size="medium" onClick={onOrderClick} disabled={isLoading || isOrderDisabled || itemCount === 0}>
          주문하기
        </Button>
      </div>
    </div>
  );
}
