import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white flex justify-between items-center sub-title h-[60px]">
      <div className="w-full flex items-center gap-2 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Image src="/icon/logo.svg" alt="올라타자 로고" width={50} height={30} />
        <h1 className="text-2xl">HOLA TAJA!</h1>
      </div>
    </header>
  );
}
