export default function Footer() {
  return (
    <footer className="mx-auto label-s text-secondary p-4 sm:p-6 bg-white w-full">
      {/* 웹용 */}
      <div className="hidden sm:flex sm:flex-col justify-center items-center">
        <p className="sm:text-sm text-center font-semibold">@2025 LikeLion FrontEnd Bootcamp 13th Hola TAJA! All rights reserved.</p>
        <p className="text-xs sm:text-sm text-center px-2 sm:px-4 mb-1">
          ※ 본 사이트는 학습 목적으로 만들어진 쇼핑몰로, 실제 결제 및 배송이 이루어지지 않습니다.
        </p>
        <p className="text-darkgray text-[0.625rem] sm:text-xs text-center px-2 sm:px-4">
          ※ Special Thanks to 엔인원 (Official NuPhy Distributor in Korea) & NuPhy
        </p>
      </div>
      {/* 모바일용 */}
      <div className="sm:hidden flex flex-col justify-center items-center">
        <p className="text-xs text-center font-semibold">@2025 LFEB 13th Hola TAJA! All rights reserved.</p>
        <p className="text-xs sm:text-sm text-center px-2 sm:px-4 mb-1">
          ※ 본 사이트는 학습 목적으로 만들어진 쇼핑몰로, <br />
          실제 결제 및 배송이 이루어지지 않습니다.
        </p>
        <p className="text-darkgray text-[0.625rem] sm:text-xs text-center px-2 sm:px-4">
          ※ Special Thanks to 엔인원 (Official NuPhy Distributor in Korea) & NuPhy
        </p>
      </div>
    </footer>
  );
}
