import Button from '@/components/Button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface HistoryCardProps {
  id: number;
  status: string;
  src: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
}

export default function HistoryCard({ id, status, src, name, price, quantity, date }: HistoryCardProps) {
  const formatPrice = price.toLocaleString();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-6 min-w-80 border-b border-lightgray px-4 py-4">
      <div className="flex flex-row gap-4">
        {/* Image */}
        <section className="grid shrink-0 rounded-xl w-[7rem] h-[7rem] min-w-28 min-h-28 overflow-hidden">
          <Image
            src={src}
            alt={`${name} 이미지`}
            width={112}
            height={112}
            className="min-w-28 min-h-28 rounded-xl object-cover col-start-1 row-start-1"
          />
          <div className="col-start-1 row-start-1 flex items-end justify-end">
            <div className="bg-black text-white text-xs font-bold opacity-65 w-6 h-6 flex items-center justify-center">{quantity}</div>
          </div>
        </section>

        {/* Order info */}
        <section className="flex flex-col justify-between flex-grow">
          <p className="text-secondary label-s">Order #{id}</p>
          <p className="text-xs">주문일시: {date}</p>

          <div className="grid grid-cols-[1fr_auto] items-end gap-x-2">
            <h4 className="label-sm sm:label-md font-bold leading-snug line-clamp-2">{name}</h4>
            <p className="text-secondary text-sm shrink-0">
              <span className="text-text">포함</span> 총 {quantity}건
            </p>
          </div>
          <p className="text-text font-semibold text-lg mb-1">총 {formatPrice}원</p>
          <Link href={`/my/${id}`} className="text-secondary label-s text-underline font-bold flex flex-row items-center">
            <p>상세보기</p>
            <ChevronRight className="w-4.5" />
          </Link>
        </section>
      </div>

      {/* Status & Review button(모바일에선 하단 / sm부터는 우측 위치) */}
      <section className="flex flex-col items-center text-center gap-2 shrink-0 sm:mr-2.5 mt-4 sm:mt-0 min-w-28">
        {status === '배송 완료' ? <h5 className="label-md font-bold text-center hidden sm:block ">{status}</h5> : ''}

        {status === '배송 완료' ? (
          <Button size="full" outlined>
            후기 작성
          </Button>
        ) : (
          <Button size="full" outlined disabled>
            {status}
          </Button>
        )}
      </section>
    </div>
  );
}
