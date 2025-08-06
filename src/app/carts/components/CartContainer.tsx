'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartResponse, CartItemData } from '@/types/cart';
import { Title } from '@/components/Typography';
import CartProductCard from '@/app/carts/components/CartProductCard';
import CartSummary from '@/app/carts/components/CartSummary';
import Button from '@/components/Button';
import { removeCartItem } from '@/data/actions/carts';

interface CartContainerProps {
  initialData: CartResponse | null; // 서버에서 전달받은 초기 장바구니 데이터
  token: string | null; // 인증 토큰
  serverError: string | null; // 서버에서 발생한 에러
}

/**
 * 장바구니 컨테이너 클라이언트 컴포넌트 (useDebounce 훅 적용)
 *
 * 주요 기능:
 * - 서버에서 받은 초기 데이터를 기반으로 클라이언트 상태 관리
 * - 디바운싱된 수량 변경 처리 (즉시 UI 업데이트 + 지연된 API 호출)
 * - 상품 삭제 기능 (Optimistic Update + API 호출)
 * - 실시간 총 금액 계산 및 업데이트
 * - 로딩 상태 및 에러 처리
 * - 반응형 레이아웃
 * - 빈 장바구니 및 로그인 필요 상태 처리
 *
 * 디바운싱 데이터 흐름:
 * 1. 사용자가 +/- 버튼 클릭
 * 2. QuantityCount → CartProductCard → CartContainer
 * 3. 즉시 UI 업데이트 (handleImmediateQuantityChange)
 * 4. 500ms 후 API 호출 (handleDebouncedQuantityChange)
 */
export default function CartContainer({ initialData, token, serverError }: CartContainerProps) {
  // ==================== 상태 관리 ====================

  /** 클라이언트 하이드레이션 완료 여부 */
  const [isClient, setIsClient] = useState(false);

  /** 장바구니 전체 데이터 */
  const [cartData, setCartData] = useState<CartResponse | null>(null);

  /** 개별 액션 로딩 상태 */
  const [isActionLoading, setIsActionLoading] = useState(false);

  /** 에러 메시지 */
  const [error, setError] = useState<string | null>(null);

  /** 라우터 */
  const router = useRouter();

  // ==================== 초기화 ====================

  /**
   * 클라이언트 하이드레이션 및 초기 데이터 설정
   */
  useEffect(() => {
    setIsClient(true);
    setCartData(initialData);
    setError(serverError);
  }, [initialData, serverError]);

  // ==================== 유틸리티 함수 ====================

  /**
   * 장바구니 총 비용 재계산
   */
  const recalculateCost = (items: CartItemData[]) => {
    const totalProductCost = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const currentCost = cartData?.cost || {
      products: 0,
      shippingFees: 0,
      discount: { products: 0, shippingFees: 0 },
      total: 0,
    };

    return {
      ...currentCost,
      products: totalProductCost,
      total: totalProductCost + currentCost.shippingFees - currentCost.discount.products - currentCost.discount.shippingFees,
    };
  };

  // ==================== 삭제 핸들러 ====================

  /**
   * 장바구니 아이템 삭제 핸들러
   * - 즉시 로컬 상태에서 아이템 제거 (Optimistic Update)
   * - API 호출로 서버에서 삭제
   * - API 실패시 이전 상태로 롤백
   */
  const handleRemoveItem = async (cartId: number) => {
    if (!token || !cartData) return;

    const targetItem = cartData.item.find(item => item._id === cartId);
    if (!targetItem) return;

    // 이전 상태 백업 (롤백용)
    const previousData = cartData;

    try {
      // 1. 즉시 로컬 상태에서 아이템 제거 (Optimistic Update)
      const updatedItems = cartData.item.filter(item => item._id !== cartId);

      setCartData(prev => ({
        ...prev!,
        item: updatedItems,
        cost: recalculateCost(updatedItems),
      }));

      // 2. API 호출로 서버에서 삭제
      setIsActionLoading(true);

      const result = await removeCartItem(token, targetItem._id);

      if (result.ok !== 1) {
        throw new Error(result.message || '상품 삭제에 실패했습니다.');
      }

      // 성공시 에러 상태 클리어
      setError(null);
    } catch (err) {
      // 3. API 실패시 이전 상태로 롤백
      setCartData(previousData);
      const errorMessage = err instanceof Error ? err.message : '상품 삭제 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Remove item error:', err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // ==================== 기타 핸들러 ====================

  const handleOrderClick = () => {
    if (!cartData || cartData.item.length === 0) {
      // 클라이언트에서만 alert 사용
      if (isClient) {
        alert('장바구니가 비어있습니다.');
      }
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  // ==================== 렌더링 조건부 처리 ====================

  // 클라이언트 하이드레이션이 완료되지 않았으면 로딩 표시
  if (!isClient) {
    return (
      <div className="min-h-screen">
        <div>
          <Title className="mb-6">장바구니</Title>
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-lightgray rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-darkgray">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  /** 토큰이 없는 경우 (로그인 필요) */
  if (!token) {
    return (
      <div className="min-h-screen">
        <div>
          <Title className="mb-6">장바구니</Title>
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-lightgray rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-medium text-text mb-2">로그인이 필요한 서비스입니다</h3>
            <p className="text-darkgray mb-6">장바구니를 이용하려면 로그인해 주세요.</p>
            <div className="space-x-4">
              <Button onClick={handleGoToLogin}>로그인하기</Button>
              <Button outlined onClick={handleContinueShopping}>
                쇼핑 계속하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /** 장바구니가 비어있는 경우 */
  if (!cartData || cartData.ok !== 1 || !cartData.item || cartData.item.length === 0) {
    return (
      <div className="min-h-screen">
        <div>
          <Title className="mb-6">장바구니</Title>
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-lightgray rounded-full flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-lg font-medium text-text mb-2">장바구니가 비어있습니다</h3>
            <p className="text-darkgray mb-6">원하는 상품을 장바구니에 담아보세요.</p>
            <Button onClick={handleContinueShopping} size="medium">
              쇼핑 계속하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 메인 렌더링 ====================

  return (
    <div className="min-h-screen">
      <div>
        {/* 페이지 제목 */}
        <Title className="mb-6">장바구니</Title>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-accent border border-lightgray rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-negative text-sm">{error}</p>
              <button onClick={() => setError(null)} className="text-negative text-sm underline hover:no-underline">
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="space-y-6">
          {/* 장바구니 아이템 목록 */}
          <div className="bg-white rounded-lg border border-lightgray p-4 sm:p-6">
            {/* 상품 목록 헤더 */}
            <div className="flex items-center justify-between pb-3 border-b border-lightgray">
              <h3 className="text-lg font-bold text-text">선택상품 ({cartData.item.length}개)</h3>
            </div>

            {/* 상품 카드 목록 */}
            <div className="space-y-0">
              {cartData.item.map(item => (
                <CartProductCard
                  key={item._id}
                  item={item}
                  token={token}
                  handleRemoveItem={handleRemoveItem}
                  // 로딩 상태
                  isDeleting={isActionLoading}
                />
              ))}
            </div>
          </div>

          {/* 주문 요약 */}
          <CartSummary
            cost={cartData?.cost}
            itemCount={cartData.item.length}
            onOrderClick={handleOrderClick}
            onContinueShoppingClick={handleContinueShopping}
            isLoading={isActionLoading}
            isOrderDisabled={cartData.item.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
