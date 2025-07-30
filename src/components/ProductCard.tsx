import ProductImg from '@/components/ProductImg';
import Link from 'next/link';

interface ProductCardProps {
  _id: number;
  imageSrc: string;
  title: string;
  price: number;
}

// 상품의 id/이미지경로/상품명/가격을 props로 받아서 동작
// id는 Link 연결할 때 사용 예정
export default function ProductCard({ _id, imageSrc, title, price }: ProductCardProps) {
  const formatPrice = price.toLocaleString();

  return (
    <div className="w-full rounded">
      <div className="w-full aspect-squre rounded-lg relative">
        <ProductImg title={title} srcList={[imageSrc]} productId={_id} />
      </div>

      <Link href={`./products/${_id}`}>
        <span className="text-sm sm:text-md text-gray-700 leading-5 line-clamp-2 webkit-line-clamp-2">{title}</span>
        <span className="font-bold pb-3">{formatPrice}원</span>
      </Link>
    </div>
  );
}
