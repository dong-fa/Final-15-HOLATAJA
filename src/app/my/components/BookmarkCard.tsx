import ProductImg from '@/components/ProductImg';
import Link from 'next/link';

export interface BookmarkCardProps {
  id: number;
  src: string;
  name: string;
  price: number;
  bookmarkId: number;
}

export default function BookmarkCard({ id, src, name, price, bookmarkId }: BookmarkCardProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-6 min-w-80 border-b border-lightgray px-4 py-4">
      <div className="w-full flex flex-row justify-between">
        {/* Product info */}
        <section className="flex items-center flex-grow">
          <Link href={`./products/${id}`}>
            <span className="label-m sm:label-l font-bold leading-snug line-clamp-2 block"> {name}</span>
            <span className="text-text font-semibold text-l mb-1 block mt-2">{price.toLocaleString()}원</span>
          </Link>
        </section>

        {/* Image */}
        <section className="grid shrink-0 rounded-xl w-[7rem] h-[7rem] min-w-28 min-h-28 overflow-hidden">
          <ProductImg title={name} srcList={[src]} productId={id} bookmarkId={bookmarkId} />
        </section>
      </div>
    </div>
  );
}
