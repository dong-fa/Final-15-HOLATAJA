import Image from 'next/image';

interface OrderCardProps {
  src: string;
  name: string;
  price: number;
  quantity: number;
  option: string;
}

export default function OrderedCard({ src, name, price, quantity, option }: OrderCardProps) {
  const formatPrice = price.toLocaleString();

  return (
    <div className="flex items-center gap-3.5 border-lightgray border-b-1 px-4 py-7">
      <div className="border border-darkgray rounded-xl">
        <Image src={src} alt={`${name}` + '이미지'} width={111} height={111} />
      </div>
      <div className="flex flex-col items-start gap-1.5">
        <p className="label-l">{name}</p>
        <p>
          <span className="border border-darkgray rounded-md w-9 h-5 label-s px-1 pt-0.5 mr-2.5">옵션</span>
          <span className="label-s">{option}</span>
        </p>
        <p className="text-text font-bold text-xs">{quantity}개</p>
        <p className="text-text font-semibold text-2xl">{formatPrice}원</p>
      </div>
    </div>
  );
}
