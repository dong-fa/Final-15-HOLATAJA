import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 아이콘 import

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // 전체 길이만큼의 배열 생성해서 페이지 수로 넘김

  return (
    <div className="flex items-center justify-center space-x-6 py-4">
      {/* prev icon */}
      <ChevronLeft size={18} />

      {/* page numbers */}
      <div className="flex items-center space-x-6">
        {pages.map(page => (
          <span key={page} className={`relative text-text label-s cursor-pointer ${currentPage === page ? 'font-semibold' : ''}`}>
            {currentPage === page && (
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-accent -z-1 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            )}
            {page}
          </span>
        ))}
      </div>

      {/* next icon */}
      <ChevronRight size={18} />
    </div>
  );
}
