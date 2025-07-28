'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 아이콘 import

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (totalPages < 1) return null;

  // 사용자가 입력한 페이지 값 정수화/입력한 함수 실행
  const handlePageClick = (p: number) => {
    const page = Math.floor(p);
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  // 전체 페이지 구성하는 배열 생성
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center py-4">
      {/* prev button */}
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 disabled:opacity-30">
        <ChevronLeft size={18} />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => handlePageClick(p)}
          className={`w-6 h-6 p-0 rounded-xl text-text label-s cursor-pointer ${p === currentPage ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'}`}
        >
          {p}
        </button>
      ))}

      {/* next button */}
      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 disabled:opacity-30">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
