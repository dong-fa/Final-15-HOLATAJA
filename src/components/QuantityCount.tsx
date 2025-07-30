'use client';

import { Plus, Minus } from 'lucide-react';
import { useQuantityDebounce } from '@/hooks/useDebounce';

interface QuantityProps {
  quantity: number; // 현재 수량 값
  onImmediateChange?: (value: number) => void; // 즉시 UI 업데이트용 콜백
  onDebouncedChange?: (value: number) => void; // 디바운싱된 API 호출용 콜백
  min?: number; // 최소값 (기본: 1)
  max?: number; // 최대값 (선택적)
  delay?: number; // 디바운싱 지연시간 (기본: 500ms)
  disabled?: boolean; // 비활성화 상태
}

/**
 * 디바운싱이 적용된 수량 조절 컴포넌트
 *
 * 주요 기능:
 * - useQuantityDebounce 훅을 활용한 디바운싱 처리
 * - 즉시 UI 반응 + 지연된 API 호출
 * - min/max 값 검증
 * - 버튼 활성화/비활성화 상태 관리
 *
 * @param quantity - 현재 수량
 * @param onImmediateChange - 즉시 호출되는 콜백 (UI 업데이트용)
 * @param onDebouncedChange - 디바운싱된 콜백 (API 호출용)
 * @param min - 최소값 (기본: 1)
 * @param max - 최대값 (선택적)
 * @param delay - 디바운싱 지연시간 (기본: 500ms)
 * @param disabled - 비활성화 상태
 */

export default function QuantityCount({
  quantity,
  onImmediateChange,
  onDebouncedChange,
  min = 1,
  max,
  delay = 500,
  disabled = false,
}: QuantityProps) {
  // useQuantityDebounce 훅 사용
  const {
    quantity: currentQuantity,
    increment,
    decrement,
    canIncrement,
    canDecrement,
    isPending,
  } = useQuantityDebounce(quantity, {
    min,
    max,
    delay,
    onImmediate: onImmediateChange,
    onDebounced: onDebouncedChange,
  });

  return (
    <div className="flex items-center gap-4">
      {/* 마이너스 버튼 */}
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          disabled || !canDecrement ? 'bg-disabled cursor-not-allowed' : 'bg-lightgray hover:bg-hover'
        }`}
        disabled={disabled || !canDecrement}
        onClick={decrement}
        aria-label="수량 감소"
      >
        <Minus className="w-5 h-5 text-text" />
      </button>

      {/* 현재 수량 표시 */}
      <div className="relative">
        <span className="contents-title w-6 text-center">{currentQuantity}</span>
        {/* 디바운싱 대기 중 표시 */}
        {isPending && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />}
      </div>

      {/* 플러스 버튼 */}
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          disabled || !canIncrement ? 'bg-disabled cursor-not-allowed' : 'bg-lightgray hover:bg-hover'
        }`}
        disabled={disabled || !canIncrement}
        onClick={increment}
        aria-label="수량 증가"
      >
        <Plus className="w-5 h-5 text-text" />
      </button>
    </div>
  );
}
