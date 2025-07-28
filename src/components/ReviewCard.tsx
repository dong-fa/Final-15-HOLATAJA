import React from 'react';
import { Pencil, Star, Trash } from 'lucide-react';
import '../app/globals.css';
import Button from '@/components/Button';

interface ReviewCardProps {
  name: string;
  createdAt: string;
  rating: number;
  content: string;
  isMyReview?: boolean;
  handleDelete: () => void;
}

function ReviewCard({ name, createdAt, rating, content, isMyReview, handleDelete }: ReviewCardProps) {
  // 별점 반환
  const stars = () => {
    const starsList = [];
    for (let i = 1; i <= 5; i++) {
      starsList.push(
        i <= rating ? (
          <Star key={i} color="var(--color-primary)" fill="var(--color-primary)" size={20} />
        ) : (
          <Star key={i} color="var(--color-gray)" size={20} />
        ),
      );
    }
    return starsList;
  };

  return (
    <>
      <div className="flex items-center w-full py-4 border-b-1 border-b-disabled">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col">
            <span>{name}</span>
            <span className="label-s text-secondary">{createdAt.split(' ')[0]}</span>
          </div>
          <div className="flex gap-0.5">
            <span className="sr-only">{`별점 ${rating}/5점`}</span>
            {stars()}
          </div>
          <div>
            <p>{content}</p>
          </div>
        </div>
        {isMyReview && (
          <div className="flex">
            <Button icon size="small" aria-label="수정">
              <Pencil color="var(--color-darkgray)" size={20} />
            </Button>
            <Button icon size="small" aria-label="삭제">
              <Trash color="var(--color-darkgray)" size={20} onClick={handleDelete} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default ReviewCard;
