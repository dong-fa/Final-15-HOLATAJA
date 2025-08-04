import ProductImg from '@/components/ProductImg';
import Link from 'next/link';

interface ProductCardProps {
  _id: number;
  imageSrc: string;
  title: string;
  price: number;
  bookmarkId?: number;
}

export default function ProductCard({ _id, imageSrc, title, price, bookmarkId }: ProductCardProps) {
  const formatPrice = price.toLocaleString();

  return (
    <div className="w-full rounded">
      <div className="w-full aspect-squre rounded-lg relative">
        <ProductImg title={title} srcList={[imageSrc]} productId={_id} bookmarkId={bookmarkId ? bookmarkId : 0} />
      </div>

      <Link href={`./products/${_id}`}>
        <span className="text-sm sm:text-md text-gray-700 leading-5 line-clamp-2 webkit-line-clamp-2">{title}</span>
        <span className="font-bold pb-3">{formatPrice}원</span>
      </Link>
    </div>
  );
}
