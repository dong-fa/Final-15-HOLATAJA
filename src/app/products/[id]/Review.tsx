'use client';

import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { ReviewItem } from '@/types/review';
import React, { useState } from 'react';

export default function Review({ reviewList }: { reviewList: ReviewItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 게시글 목록 첫번째 index
  const startIdx = (currentPage - 1) * 5;

  return (
    <div>
      {reviewList.slice(startIdx, startIdx + 5).map(review => (
        <ReviewCard
          key={review._id}
          name={review.user.name}
          createdAt={review.createdAt.split(' ')[0]}
          rating={review.rating}
          content={review.content}
        ></ReviewCard>
      ))}
      <Pagination totalPages={Math.ceil(reviewList.length / 5) || 1} currentPage={currentPage} />
    </div>
  );
}
