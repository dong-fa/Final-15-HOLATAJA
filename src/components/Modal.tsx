import React from 'react';
import { X } from 'lucide-react'; // Lucide 아이콘 import
import Button from '@/components/Button';

// 부모 컴포넌트로부터 전달할 props 타입 정의
interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  handleClose: () => void; // 모달 닫기 함수
  handleConfirm: () => void; // 구매 확인 처리 함수
  title?: string; // 모달 제목(동적)
  description: string; // 모달 본문 메세지(동적)
  hideCancelButton?: boolean; // 취소 버튼 숨기기 여부
}

export default function Modal({ isOpen, handleClose, handleConfirm, title, description, hideCancelButton }: ModalProps) {
  // 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* 모달 박스 */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-[400px]">
        {/* 오른쪽 상단 닫기 버튼 */}
        <Button onClick={handleClose} className="absolute top-4 right-4" size="medium" icon>
          <X size={24} /> {/* Lucide X 아이콘 */}
        </Button>

        {/* 모달 제목 */}
        <h2 className="mb-4 text-center sub-title">{title}</h2>

        {/* 모달 본문 */}
        <p className="mb-6 text-center label-m">{description}</p>

        {/* 버튼 그룹 */}
        <div className="flex justify-center gap-4">
          {/* 취소 버튼 */}
          {hideCancelButton ?? (
            <Button outlined onClick={handleClose} size="medium">
              취소
            </Button>
          )}

          {/* 확인 버튼 */}
          <Button onClick={handleConfirm} size="medium">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
