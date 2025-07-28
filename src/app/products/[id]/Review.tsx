'use client';

import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { deleteReview } from '@/data/actions/review';
import useAuthStore from '@/store/authStore';
import { ReviewItem } from '@/types/review';
import { MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { startTransition, useState } from 'react';

export default function Review({ reviewList }: { reviewList: ReviewItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 현재 페이지의 게시글 목록 첫번째 index
  const startIdx = (currentPage - 1) * 5;

  const { user } = useAuthStore();
  const router = useRouter();

  // 구매 후기 삭제
  const handleDelete = (_id: number) => {
    startTransition(async () => {
      try {
        await deleteReview(_id);
        setIsConfirmModalOpen(false);
        // 목록 새로고침
        router.refresh();
      } catch (error) {
        setIsConfirmModalOpen(false);
        setIsFailModalOpen(true);
      }
    });
  };
  return (
    <div>
      {!reviewList.length ? (
        <div className="flex flex-col items-center py-8 border-b-1 border-b-lightgray">
          <MessageCircleMore className="mb-4" size={32} />
          <p>작성된 구매 후기가 없습니다.</p>
        </div>
      ) : (
        reviewList.slice(startIdx, startIdx + 5).map(review => (
          <ReviewCard
            key={review._id}
            name={review.user.name}
            createdAt={review.createdAt.split(' ')[0]}
            rating={review.rating}
            content={review.content}
            isMyReview={review.user._id === user?._id}
            handleDelete={() => {
              setIsConfirmModalOpen(true);
              setSelectedId(review._id);
            }}
          ></ReviewCard>
        ))
      )}
      {reviewList.length ? <Pagination totalPages={Math.ceil(reviewList.length / 5) || 1} currentPage={currentPage} /> : null}
      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        handleClose={() => setIsConfirmModalOpen(false)}
        handleConfirm={() => selectedId && handleDelete(selectedId)}
        description="정말 삭제하시겠습니까?"
      ></Modal>
      {/* 삭제 실패 모달 */}
      <Modal
        isOpen={isFailModalOpen}
        handleClose={() => setIsFailModalOpen(false)}
        handleConfirm={() => setIsFailModalOpen(false)}
        description="삭제가 실패하였습니다."
        hideCancelButton
      ></Modal>
    </div>
  );
}
