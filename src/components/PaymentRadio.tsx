'use client'; // Next.js에서 이 컴포넌트가 브라우저에서 동작하도록 지정

import Image from 'next/image'; // next/image를 사용해서 이미지를 최적화해서 보여줌
import { PaymentOption } from '../types/payment'; // 결제 옵션 타입을 불러옴

// PaymentRadioProps 타입 정의
// options: 결제 수단 목록 배열
// selected: 현재 선택된 결제 수단의 id
// onSelectOption: 결제 수단을 선택했을 때 실행되는 함수
type PaymentRadioProps = {
  options: PaymentOption[];
  selected: string;
  onSelectOption: (id: string) => void;
};

// 결제 수단 라디오 버튼 컴포넌트
export default function PaymentRadio({ options, selected, onSelectOption }: PaymentRadioProps) {
  return (
    // 결제 수단들을 세로로 나열, 각 옵션 사이에 간격(gap-4)
    <div className="flex flex-col gap-4">
      {/* 결제 수단 옵션 배열을 하나씩 반복해서 라디오 버튼과 라벨을 만듦 */}
      {options.map(option => (
        // 라벨을 클릭하면 라디오 버튼도 선택됨. flex로 아이콘, 텍스트, 버튼을 가로로 정렬
        <label key={option.id} className="flex items-center cursor-pointer">
          <input
            type="radio" // 라디오 버튼 타입
            name="payment" // 같은 그룹으로 묶어서 하나만 선택 가능하게 함
            value={option.id} // 이 버튼의 값은 결제 수단 id
            checked={selected === option.id} // 현재 선택된 결제 수단이면 체크됨
            onChange={() => onSelectOption(option.id)} // 선택하면 해당 id를 부모로 전달
            className={`
              appearance-none // 브라우저 기본 스타일 제거
              w-5 h-5 // 버튼 크기
              border-2 border-gray-400 // 테두리 두께와 색상
              rounded-full // 동그란 모양
              relative
              mr-2 // 오른쪽에 여백
              transition-colors // 색상 변경 애니메이션
              checked:border-[var(--color-primary)] // 선택됐을 때 테두리 색상 변경
              before:content-[''] // 가상 요소로 내부 원 만듦
              before:w-2.5 before:h-2.5 // 내부 원 크기
              before:rounded-full // 내부 원도 동그랗게
              before:bg-transparent // 기본은 투명
              before:absolute
              before:top-1/2
              before:left-1/2
              before:-translate-x-1/2
              before:-translate-y-1/2
              checked:before:bg-[var(--color-primary)] // 선택됐을 때 내부 원 색상 변경
            `}
          />
          {/* 라디오 버튼 오른쪽에 결제 수단 로고와 이름을 표시 */}
          <div className="flex items-center gap-2">
            {/* 결제 수단 로고 이미지. next/image로 최적화 */}
            <Image src={option.logo} alt={option.label} width={50} height={20} />
            {/* 결제 수단 이름. 스타일 적용 */}
            <span className="label-m text-[var(--color-primary)]">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
