import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { ThumbsDown } from 'lucide-react';
import Image from 'next/image';

export default function Icons() {
  return (
    <div>
      <ShoppingCart />
      <User />
      <Search />
      <ThumbsUp />
      <ThumbsDown />
      <Image src="/icon/off_star.svg" alt="찜하기 비활성" width={24} height={24} />
      <Image src="/icon/on_star.svg" alt="찜하기 비활성" width={24} height={24} />
    </div>
  );
}
