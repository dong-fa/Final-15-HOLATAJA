import React from 'react';
import { X } from 'lucide-react'; // Lucide에서 X 아이콘 import

// props 타입 정의
interface PurchaseModalProps {
  isOpen: boolean; // 모달 열림 여부
  handleClose: () => void; // 닫기 함수
  handleConfirm: () => void; // 확인 함수
}

// 함수 선언식으로 작성
export default function PurchaseModal({ isOpen, handleClose, handleConfirm }: PurchaseModalProps) {
  if (!isOpen) return null; // 열려있지 않으면 렌더링 X

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
      {/* 모달 박스 */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-[400px]">
        {/* 닫기 아이콘 버튼 */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} /> {/* Lucide 아이콘 사용 */}
        </button>

        {/* 모달 제목 */}
        <h2 className="sub-title text-center mb-4">구매 결정</h2>

        {/* 모달 내용 */}
        <p className="label-m text-center mb-6">정말 구매하시겠습니까?</p>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-4">
          {/* 취소 버튼 */}
          <button onClick={handleClose} className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-accent transition">
            취소
          </button>

          {/* 확인 버튼 */}
          <button onClick={handleConfirm} className="px-6 py-2 bg-primary text-white rounded-md hover:bg-hover transition">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
