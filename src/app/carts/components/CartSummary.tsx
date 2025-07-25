// 주문 요약 컴포넌트의 Props 타입 정의
interface CartSummaryProps {
  subtotal: number; // 상품 금액 합계
  shipping: number; // 배송비
  total: number; // 최종 총 주문금액
}

export default function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 w-full">
      {/* 금액 정보 섹션 */}
      <div className="space-y-3 sm:space-y-3 mb-3 sm:mb-4">
        {/* 상품 금액 */}
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-700">상품 금액</span>
          <span className="text-sm sm:text-base font-medium">{subtotal.toLocaleString()}원</span>
        </div>

        {/* 배송비 */}
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-700">배송비</span>
          <span className="text-sm sm:text-base font-medium">{shipping.toLocaleString()}원</span>
        </div>

        <hr className="border-gray-200" />

        {/* 총 주문금액 - 강조 */}
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-gray-900">총 주문금액</span>
          <span className="text-lg sm:text-xl font-bold text-gray-900">{total.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
