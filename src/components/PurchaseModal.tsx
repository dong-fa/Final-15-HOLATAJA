import React from 'react';
import { X } from 'lucide-react'; // Lucide 아이콘 import
import Button from '@/components/Button';

// 자식 컴포넌트에 전달할 props 타입 정의
interface PurchaseModalProps {
  isOpen: boolean; // 모달 열림 여부
  handleClose: () => void; // 모달 닫기 함수
  handleConfirm: () => void; // 구매 확인 처리 함수
}

// 자식 컴포넌트 함수 선언식
export default function PurchaseModal({ isOpen, handleClose, handleConfirm }: PurchaseModalProps) {
  // 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
      {/* 모달 박스 */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-[400px]">
        {/* 오른쪽 상단 닫기 버튼 */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} /> {/* Lucide X 아이콘 */}
        </button>

        {/* 모달 제목 */}
        <h2 className="sub-title text-center mb-4">구매 결정</h2>

        {/* 모달 본문 */}
        <p className="label-m text-center mb-6">정말 구매하시겠습니까?</p>

        {/* 버튼 그룹 */}
        <div className="flex justify-center gap-4">
          {/* 취소 버튼 */}
          <Button outlined onClick={handleClose}>
            취소
          </Button>

          {/* 확인 버튼 */}
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
}
