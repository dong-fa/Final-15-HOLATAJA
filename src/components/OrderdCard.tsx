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
      <div className=" rounded-xl ">
        <Image src={src} alt={`${name}` + '이미지'} width={111} height={111} className="rounded-md" />
      </div>
      <div className="flex flex-col items-start gap-1.5">
        <p className="label-md font-bold">{name}</p>
        <p>
          <span className="border border-darkgray rounded-md w-9 h-5 label-s px-1 mr-2.5">옵션</span>
          <span className="label-s">{option}</span>
        </p>
        <p className="text-text font-bold text-sm">{quantity}개</p>
        <p className="text-text font-semibold text-lg">{formatPrice}원</p>
      </div>
    </div>
  );
}
