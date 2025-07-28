'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartResponse, CartItemData } from '@/types/cart';
import { Title } from '@/components/Typography';
import CartProductCard from '@/app/carts/components/CartProductCard';
import CartSummary from '@/app/carts/components/CartSummary';
import Button from '@/components/Button';
import { removeCartItem } from '@/data/functions/carts';
// import { ApiRes } from '@/types/api';

interface CartContainerProps {
  initialData: CartResponse | null; // 서버에서 전달받은 초기 장바구니 데이터
  token: string | null; // 인증 토큰
  serverError: string | null; // 서버에서 발생한 에러 (있는 경우)
}

/**
 * 장바구니 컨테이너 클라이언트 컴포넌트
 *
 * 주요 기능:
 * - 서버에서 받은 초기 데이터를 기반으로 클라이언트 상태 관리
 * - 상품 수량 변경 (로컬 상태만 업데이트, 디바운싱 확정 후 API 연동 예정)
 * - 상품 삭제 기능 (API 호출 포함)
 * - 실시간 총 금액 계산 및 업데이트
 * - 로딩 상태 및 에러 처리
 * - 반응형 레이아웃 (모바일/데스크톱)
 * - 빈 장바구니 및 로그인 필요 상태 처리
 *
 * 데이터 흐름:
 * 1. 서버에서 초기 데이터 받아서 상태 초기화
 * 2. 클라이언트에서 상태 관리
 * 3. 수량 변경: 로컬 상태만 즉시 업데이트 (서버 동기화는 추후 구현)
 * 4. 아이템 삭제: API 호출 후 로컬 상태 업데이트
 * 5. UI 즉시 반영으로 사용자 경험 개선
 */
export default function CartContainer({ initialData, token, serverError }: CartContainerProps) {
  // ==================== 상태 관리 ====================

  /** 장바구니 전체 데이터 (아이템 목록 + 비용 정보) */
  // const [cartData, setCartData] = useState<ApiRes<CartItemData[]> | null>(initialData);
  const [cartData, setCartData] = useState<CartResponse | null>(initialData);
  console.log('카트데이터4:', cartData);

  /** 개별 액션 로딩 상태 (아이템 삭제 등) */
  const [isActionLoading, setIsActionLoading] = useState(false);

  /** 에러 메시지 (서버 에러 + 클라이언트 에러) */
  const [error, setError] = useState<string | null>(serverError);

  /** 라우터 (페이지 이동용) */
  const router = useRouter();

  // ==================== 초기화 ====================

  /**
   * 서버 에러가 있는 경우 클라이언트 에러 상태에 설정
   */
  useEffect(() => {
    if (serverError) {
      setError(serverError);
    }
  }, [serverError]);

  // ==================== 유틸리티 함수 ====================

  /**
   * 장바구니 총 비용 재계산
   * 아이템 수량 변경이나 삭제 후 클라이언트에서 즉시 계산
   */
  const recalculateCost = (items: CartItemData[]) => {
    // 상품 총 금액 계산
    const totalProductCost = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // 기존 배송비와 할인 정보는 유지하면서 총액만 재계산
    // const currentCost = cartData?.item || {
    const currentCost = cartData?.cost || {
      products: '0',
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

  // ==================== 이벤트 핸들러 ====================

  /**
   * 장바구니 아이템 수량 변경 핸들러
   * 현재는 로컬 상태만 업데이트 (디바운싱 로직 확정 후 API 호출 추가 예정)
   *
   * 동작 과정:
   * 1. 즉시 로컬 상태 업데이트 (UI 빠른 반응)
   * 2. TODO: 디바운싱 로직으로 API 호출 구현 예정
   *
   * @param productId - 상품 ID
   * @param newQuantity - 새로운 수량
   */
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (!cartData) return;

    try {
      // 로컬 상태에서 수량 업데이트
      const updatedItems = cartData.item.map(item => (item.product._id === productId ? { ...item, quantity: newQuantity } : item));

      setCartData(prev => ({
        ...prev!,
        item: updatedItems,
        cost: recalculateCost(updatedItems),
      }));

      // 에러 상태 클리어 (로컬 업데이트는 항상 성공)
      setError(null);

      // TODO: 디바운싱 로직 확정 후 API 호출 구현 예정
      // 예상 구조:
      // debouncedApiCall(productId, newQuantity, token);
      //
      // 또는:
      // const targetItem = cartData.item.find(item => item.product._id === productId);
      // if (targetItem) {
      //   await updateCartItemQuantity(token, targetItem._id, newQuantity);
      // }
    } catch (err) {
      // 로컬 상태 업데이트 실패시 (거의 발생하지 않음)
      const errorMessage = err instanceof Error ? err.message : '수량 변경 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Local quantity change error:', err);
    }
  };

  /**
   * 장바구니 아이템 삭제 핸들러
   *
   * 동작 과정:
   * 1. 삭제 확인 다이얼로그
   * 2. 즉시 로컬 상태에서 아이템 제거
   * 3. API 호출로 서버에서 삭제
   * 4. API 실패시 이전 상태로 롤백
   *
   * @param productId - 삭제할 상품 ID
   */
  const handleRemoveItem = async (productId: number) => {
    if (!token || !cartData) return;

    // 삭제 확인 (사용자 실수 방지)
    const targetItem = cartData.item.find(item => item.product._id === productId);
    if (!targetItem) return;

    const confirmDelete = window.confirm(`${targetItem.product.name}을(를) 장바구니에서 삭제하시겠습니까?`);
    if (!confirmDelete) return;

    // 이전 상태 백업 (롤백용)
    const previousData = cartData;

    try {
      // 1. 즉시 로컬 상태에서 아이템 제거
      const updatedItems = cartData.item.filter(item => item.product._id !== productId);

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

  /**
   * 주문하기 버튼 클릭 핸들러
   * 주문 페이지로 이동하거나 주문 처리 로직 실행
   */
  const handleOrderClick = () => {
    if (!cartData || cartData.item.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }

    // 주문 페이지로 이동 (라우트는 프로젝트에 맞게 수정)
    router.push('/checkout');
  };

  /**
   * 쇼핑 계속하기 버튼 클릭 핸들러
   */
  const handleContinueShopping = () => {
    router.push('/products'); // 상품 목록 페이지로 이동
  };

  /**
   * 로그인 페이지로 이동
   */
  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  // ==================== 렌더링 조건부 처리 ====================

  /** 토큰이 없는 경우 (로그인 필요) */
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Title className="mb-6">장바구니</Title>
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">로그인이 필요한 서비스입니다</h3>
            <p className="text-gray-600 mb-6">장바구니를 이용하려면 로그인해 주세요.</p>
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
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Title className="mb-6">장바구니</Title>
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
            <p className="text-gray-600 mb-6">원하는 상품을 장바구니에 담아보세요.</p>
            <Button onClick={handleContinueShopping}>쇼핑 계속하기</Button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 메인 렌더링 ====================

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 페이지 제목 */}
        <Title className="mb-6">장바구니</Title>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-red-600 text-sm">{error}</p>
              <button onClick={() => setError(null)} className="text-red-600 text-sm underline hover:no-underline">
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="space-y-6">
          {/* 장바구니 아이템 목록 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            {/* 상품 목록 헤더 */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">선택상품 ({cartData.item.length}개)</h2>
            </div>

            {/* 상품 카드 목록 */}
            <div className="space-y-0">
              {cartData.item.map(item => (
                <CartProductCard
                  key={item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                  isLoading={isActionLoading} // 삭제 처리 중일 때만 사용
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
            isLoading={isActionLoading} // 삭제 처리 등의 로딩 상태
            isOrderDisabled={cartData.item.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
