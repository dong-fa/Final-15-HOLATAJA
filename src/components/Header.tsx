'use client';

import { ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  console.log(path);

  return (
    <header className="bg-white flex justify-between items-center sub-title h-[60px]">
      <div className="w-full flex justify-between items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link className="flex gap-2" href="/">
          <Image src="/icon/logo.svg" alt="올라타자 로고" width={50} height={30} />
          <h1 className="text-2xl">HOLA TAJA!</h1>
        </Link>
        <div className="flex gap-2">
          <Link href="/my" title="마이페이지">
            <User color={path === '/my' ? 'var(--color-primary)' : 'currentColor'} />
          </Link>
          <Link href="/cart" title="장바구니">
            <ShoppingCart color={path === '/cart' ? 'var(--color-primary)' : 'currentColor'} />
          </Link>
        </div>
      </div>
    </header>
  );
}
