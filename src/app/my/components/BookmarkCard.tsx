import Button from '@/components/Button';
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
        <section className="flex flex-col justify-between flex-grow">
          <div className="grid grid-cols-[1fr_auto] items-end gap-x-2">
            <Link href={`./products/${id}`}>
              <span className="label-m sm:label-l font-bold leading-snug line-clamp-2 block"> {name}</span>
              <span className="text-text font-semibold text-lg mb-1 block mt-7">총 {price.toLocaleString()}원</span>
            </Link>
          </div>
          <div className="w-30">
            <Button size="medium" outlined>
              장바구니
            </Button>
          </div>
        </section>

        {/* Image */}
        <section className="grid shrink-0 rounded-xl w-[7rem] h-[7rem] min-w-28 min-h-28 overflow-hidden">
          <ProductImg title={name} srcList={[src]} productId={id} bookmarkId={bookmarkId} />
        </section>
      </div>
    </div>
  );
}
