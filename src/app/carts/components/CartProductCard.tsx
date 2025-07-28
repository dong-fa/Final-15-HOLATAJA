'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { CartItemData } from '@/types/cart';
import QuantityCount from '@/components/QuantityCount';
import { ContentsTitle, Contents } from '@/components/Typography';

interface CartProductCardProps {
  item: CartItemData; // 장바구니 아이템 데이터 (상품 정보, 수량 등 포함)
  onQuantityChange: (productId: number, newQuantity: number) => void; // 수량 변경시 호출되는 콜백 함수 (로컬 상태만 업데이트)
  onRemoveItem: (productId: number) => void; // 상품 삭제시 호출되는 콜백 함수 (API 호출 포함)
  isLoading?: boolean; // 로딩 상태 (삭제 처리 중)
}

/**
 * 장바구니 개별 상품 카드 컴포넌트
 *
 * 주요 기능:
 * - 상품 이미지, 이름, 옵션 정보 표시
 * - QuantityCount 컴포넌트를 활용한 수량 조절 (로컬 상태만 업데이트)
 * - 삭제 버튼 (X 아이콘, API 호출 포함)
 * - 실시간 가격 계산 및 표시
 * - 반응형 디자인 (모바일/데스크톱 대응)
 *
 * @param item - 장바구니 아이템 데이터
 * @param onQuantityChange - 수량 변경 콜백 (로컬 상태만 업데이트, 디바운싱 확정 후 API 연동 예정)
 * @param onRemoveItem - 아이템 삭제 콜백 (API 호출 포함, 상위 컴포넌트에서 상태 관리)
 * @param isLoading - 로딩 상태 (삭제 처리 중, 선택적, 기본값 false)
 */
export default function CartProductCard({ item, onQuantityChange, onRemoveItem, isLoading = false }: CartProductCardProps) {
  /**
   * 숫자를 천 단위 콤마 형식으로 포맷팅
   * 예: 1500000 → "1,500,000"
   */
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR');
  };

  /**
   * 수량 변경 핸들러
   * QuantityCount 컴포넌트에서 호출되며, 상위 컴포넌트로 전달
   * 현재는 로컬 상태만 업데이트 (디바운싱 확정 후 API 연동 예정)
   */
  const handleQuantityChange = (newQuantity: number): void => {
    onQuantityChange(item.product._id, newQuantity);
  };

  /**
   * 아이템 삭제 핸들러
   * 삭제 버튼 클릭시 상위 컴포넌트로 삭제 요청 전달
   */
  const handleRemoveItem = (): void => {
    onRemoveItem(item.product._id);
  };

  /**
   * 상품 이미지 URL 생성
   * API에서 받은 이미지 경로를 절대 URL로 변환
   * 이미지가 없는 경우 기본 이미지 사용
   */
  const getImageUrl = (): string => {
    if (item.product.image?.path) {
      // API 서버의 이미지 경로를 절대 URL로 변환
      return `${process.env.NEXT_PUBLIC_API_URL}/${item.product.image.path}`;
    }
    // 기본 이미지 경로 (public 폴더에 placeholder 이미지 필요)
    return '/images/placeholder-product.jpg';
  };

  /**
   * 총 가격 계산 (상품 단가 × 수량)
   */
  const totalPrice = item.product.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-4 sm:py-6 border-b border-gray-200 last:border-b-0">
      {/* 상품 이미지 영역 */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={getImageUrl()}
            alt={`${item.product.name} 상품 이미지`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AoU+RbLn"
          />
        </div>
      </div>

      {/* 상품 정보 및 컨트롤 영역 */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          {/* 상품명과 옵션 정보 */}
          <div className="flex-grow">
            {/* 상품명 - Typography 컴포넌트 사용 */}
            {/* <SubTitle className="mb-1 text-gray-900">{item.product.name}</SubTitle> */}
            <Contents className="mb-1 text-gray-900 label-m">{item.product.name}</Contents>

            {/* 옵션 정보 (옵션이 있는 경우에만 표시) */}
            {item.product.extra?.option && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2 py-0.5 text-xs border border-gray-400 rounded text-gray-600">옵션</span>
                {/* 옵션값 - Typography 컴포넌트 사용 */}
                <Contents size="small" className="text-gray-600">
                  {item.product.extra.option}
                </Contents>
              </div>
            )}
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={handleRemoveItem}
            disabled={isLoading}
            className="self-start p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`${item.product.name} 상품 삭제`}
          >
            <X size={20} />
          </button>
        </div>

        {/* 수량 조절 및 가격 표시 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-3">
          {/* 수량 조절 */}
          <QuantityCount quantity={item.quantity} handleCountQuantity={handleQuantityChange} />

          {/* 가격 */}
          <ContentsTitle className="text-gray-900 font-bold">{formatPrice(totalPrice)}원</ContentsTitle>
        </div>

        {/* 로딩 상태 표시 (아이템 삭제 처리 중일 때만) */}
        {isLoading && (
          <div className="mt-2">
            <Contents size="small" className="text-blue-600">
              삭제 처리 중...
            </Contents>
          </div>
        )}
      </div>
    </div>
  );
}
