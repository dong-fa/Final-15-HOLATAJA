'use client'; // Next.js 클라이언트 컴포넌트임을 명시

import { Plus, Minus } from 'lucide-react'; // 플러스, 마이너스 아이콘 import

interface QuantityProps {
  quantity: number; // 현재 수량 값
  handleCountQuantity: (value: number) => void; // 수량이 변경될 때 호출되는 함수
}

export default function QuantityCount({ quantity, handleCountQuantity }: QuantityProps) {
  // 마이너스 버튼 클릭 시 실행되는 함수
  const handleMinus = () => {
    if (quantity > 1) {
      // 수량이 1보다 클 때만 감소
      handleCountQuantity(quantity - 1); // 수량을 1 감소시켜 부모로 전달
    }
  };

  // 플러스 버튼 클릭 시 실행되는 함수
  const handlePlus = () => {
    handleCountQuantity(quantity + 1); // 수량을 1 증가시켜 부모로 전달
  };

  return (
    <div className="flex items-center gap-4">
      {' '}
      {/* 버튼과 수량을 가로로 정렬, 간격 4 */}
      <button
        className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center hover:bg-[var(--color-hover)] transition disabled:bg-[var(--color-disabled)]"
        disabled={quantity === 1} // 수량이 1이면 비활성화
        onClick={handleMinus} // 클릭 시 handleMinus 실행
      >
        <Minus className="w-5 h-5 text-[var(--color-text)]" /> {/* 마이너스 아이콘 */}
      </button>
      <span className="contents-title w-6 text-center">{quantity}</span> {/* 현재 수량 표시 */}
      <button
        className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center hover:bg-[var(--color-hover)] transition"
        onClick={handlePlus} // 클릭 시 handlePlus 실행
      >
        <Plus className="w-5 text-[var(--color-text)]" /> {/* 플러스 아이콘 */}
      </button>
    </div>
  );
}
