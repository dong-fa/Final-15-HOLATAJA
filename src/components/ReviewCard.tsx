import React from 'react';
import { Star } from 'lucide-react';
import '../app/globals.css';

interface ReviewCardProps {
  name: string;
  createdAt: string;
  rating: number;
  content: string;
}

function ReviewCard({ name, createdAt, rating, content }: ReviewCardProps) {
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
    <div className="flex flex-col gap-2 py-4 border-b-1 border-b-disabled">
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="label-s text-secondary">{createdAt.split(' ')[0]}</span>
      </div>
      <div className="flex gap-0.5">{stars()}</div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
