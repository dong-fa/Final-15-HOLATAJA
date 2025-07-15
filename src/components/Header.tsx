import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 sub-title h-[60px] border-b-1 border-background">
      <div className="flex justify-center items-center gap-2">
        <Image src="/logo.svg" alt="올라타자 로고" width={50} height={30} />
        <h1>HOLA TAJA!</h1>
      </div>
    </header>
  );
}
