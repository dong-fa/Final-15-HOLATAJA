import { useState, useEffect, useCallback, useRef } from 'react';

interface UseDebounceOptions<T> {
  delay?: number; // 디바운싱 지연시간 (기본: 500ms)
  onImmediate?: (value: T) => void; // 즉시 호출되는 콜백 (UI 업데이트용)
  onDebounced?: (value: T) => void; // 디바운싱된 콜백 (API 호출용)
  equalityFn?: (prev: T, next: T) => boolean; // 값 비교 함수 (기본: === 비교)
}

interface UseDebounceReturn<T> {
  debouncedValue: T; // 디바운싱된 값
  immediateValue: T; // 즉시 반영되는 값 (로컬 상태)
  setValue: (newValue: T) => void; // 값 설정 함수
  isPending: boolean; // 디바운싱 대기 중 여부
  cancel: () => void; // 디바운싱 취소 함수
}

/**
 * 디바운싱 기능을 제공하는 커스텀 훅
 *
 * 주요 기능:
 * - 즉시 UI 반응: 값 변경 시 로컬 상태 즉시 업데이트
 * - 디바운싱 처리: 지정된 지연시간 후 콜백 실행
 * - 안전한 상태 관리: 컴포넌트 언마운트 시 타이머 자동 정리
 * - 유연한 설정: 지연시간, 콜백 함수, 비교 함수 커스터마이징 가능
 * - 상태 추적: 디바운싱 대기 중 여부 확인 가능
 *
 * @param initialValue 초기값
 * @param options 디바운싱 옵션들
 * @returns 디바운싱 관련 상태와 함수들
 */
export function useDebounce<T>(initialValue: T, options: UseDebounceOptions<T> = {}): UseDebounceReturn<T> {
  const { delay = 500, onImmediate, onDebounced, equalityFn = (prev: T, next: T) => prev === next } = options;

  // ==================== 상태 관리 ====================

  /** 즉시 반영되는 로컬 값 (UI에서 표시할 값) */
  const [immediateValue, setImmediateValue] = useState<T>(initialValue);

  /** 디바운싱된 값 (API 호출에 사용할 값) */
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  /** 디바운싱 대기 중 여부 */
  const [isPending, setIsPending] = useState<boolean>(false);

  // ==================== 참조 관리 ====================

  /** 디바운싱 타이머 참조 */
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** 컴포넌트 마운트 상태 확인용 */
  const isMountedRef = useRef<boolean>(true);

  /** 마지막으로 디바운싱된 값 참조 (중복 호출 방지용) */
  const lastDebouncedValueRef = useRef<T>(initialValue);

  // ==================== 초기화 및 정리 ====================

  /**
   * 초기값이 변경되면 상태 동기화
   * (예: 부모 컴포넌트에서 새로운 초기값 전달)
   */
  useEffect(() => {
    setImmediateValue(initialValue);
    setDebouncedValue(initialValue);
    lastDebouncedValueRef.current = initialValue;
  }, [initialValue]);

  /**
   * 컴포넌트 언마운트 시 타이머 정리
   */
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ==================== 디바운싱 로직 ====================

  /**
   * 디바운싱 타이머 취소 함수
   */
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsPending(false);
    }
  }, []);

  /**
   * 디바운싱된 값 업데이트 함수
   * 지연시간 후 실행되며, 콜백 호출 및 상태 업데이트 담당
   */
  const updateDebouncedValue = useCallback(
    (newValue: T) => {
      // 컴포넌트가 언마운트되었으면 실행하지 않음
      if (!isMountedRef.current) return;

      // 이미 같은 값으로 디바운싱된 경우 중복 실행 방지
      if (equalityFn(lastDebouncedValueRef.current, newValue)) {
        setIsPending(false);
        return;
      }

      // 디바운싱된 값 상태 업데이트
      setDebouncedValue(newValue);
      lastDebouncedValueRef.current = newValue;
      setIsPending(false);

      // 디바운싱 콜백 실행
      if (onDebounced) {
        onDebounced(newValue);
      }
    },
    [onDebounced, equalityFn],
  );

  /**
   * 값 설정 함수
   * 1. 즉시 로컬 상태 업데이트 (UI 반응성)
   * 2. 즉시 콜백 호출 (부모 컴포넌트 상태 업데이트)
   * 3. 디바운싱 타이머 설정 (API 호출 예약)
   */
  const setValue = useCallback(
    (newValue: T) => {
      // 현재 즉시값과 동일하면 아무것도 하지 않음
      if (equalityFn(immediateValue, newValue)) {
        return;
      }
      console.log('useDebounce setValue 호출', { newValue, immediateValue });

      // 1. 즉시 로컬 상태 업데이트 (UI에 즉시 반영)
      setImmediateValue(newValue);

      // 2. 즉시 콜백 호출 (부모 컴포넌트의 상태 업데이트)
      if (onImmediate) {
        console.log('useDebounce onImmediate 실행');
        onImmediate(newValue);
      }

      // 3. 기존 디바운싱 타이머 취소
      cancel();

      // 4. 새로운 디바운싱 타이머 설정
      if (delay > 0) {
        setIsPending(true);
        timeoutRef.current = setTimeout(() => {
          updateDebouncedValue(newValue);
          timeoutRef.current = null;
        }, delay);
      } else {
        // delay가 0이면 즉시 실행
        updateDebouncedValue(newValue);
      }
    },
    [immediateValue, onImmediate, delay, cancel, updateDebouncedValue, equalityFn],
  );

  // ==================== 반환값 ====================

  return {
    debouncedValue, // 디바운싱된 값 (API 호출용)
    immediateValue, // 즉시 반영되는 값 (UI 표시용)
    setValue, // 값 설정 함수
    isPending, // 디바운싱 대기 중 여부
    cancel, // 디바운싱 취소 함수
  };
}

/**
 * 수량 조절 전용 디바운싱 훅
 * useDebounce를 래핑하여 수량 조절에 특화된 인터페이스 제공
 *
 * @param initialQuantity 초기 수량
 * @param options 디바운싱 옵션 + 수량 제한 옵션
 * @returns 수량 조절 관련 상태와 함수들
 */
export function useQuantityDebounce(
  initialQuantity: number,
  options: UseDebounceOptions<number> & {
    min?: number; // 최소 수량 (기본: 1)
    max?: number; // 최대 수량 (선택적)
  } = {},
) {
  const { min = 1, max, ...debounceOptions } = options;

  const debounce = useDebounce(initialQuantity, debounceOptions);

  /**
   * 수량 증가 함수 (최대값 검증 포함)
   */
  const increment = useCallback(() => {
    const newQuantity = debounce.immediateValue + 1;
    if (!max || newQuantity <= max) {
      debounce.setValue(newQuantity);
    }
  }, [debounce, max]);

  /**
   * 수량 감소 함수 (최소값 검증 포함)
   */
  const decrement = useCallback(() => {
    const newQuantity = Math.max(min, debounce.immediateValue - 1);
    debounce.setValue(newQuantity);
  }, [debounce, min]);

  /**
   * 직접 수량 설정 함수 (min/max 검증 포함)
   */
  const setQuantity = useCallback(
    (quantity: number) => {
      const validQuantity = Math.max(min, max ? Math.min(max, quantity) : quantity);
      debounce.setValue(validQuantity);
    },
    [debounce, min, max],
  );

  return {
    ...debounce,
    quantity: debounce.immediateValue, // 현재 수량 (alias)
    increment, // 수량 증가
    decrement, // 수량 감소
    setQuantity, // 직접 수량 설정
    canIncrement: !max || debounce.immediateValue < max, // 증가 가능 여부
    canDecrement: debounce.immediateValue > min, // 감소 가능 여부
  };
}
