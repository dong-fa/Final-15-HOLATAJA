export default function Footer() {
  return (
    <footer className="mx-auto label-s text-secondary p-4 sm:p-6">
      <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm text-center">@2025 LikeLion FrontEnd Bootcamp 13th Hola TAJA! All rights reserved.</p>
        <p className="text-xs sm:text-sm text-center px-2 sm:px-4">
          ※ 본 사이트는 학습 목적으로 만들어진 쇼핑몰로, 실제 결제 및 배송이 이루어지지 않습니다.
        </p>
        <p className="text-darkgray text-xs sm:text-sm text-center px-2 sm:px-4">
          ※ Special Thanks to 엔인원 (Official NuPhy Distributor in Korea) & NuPhy
        </p>
      </div>
    </footer>
  );
}
