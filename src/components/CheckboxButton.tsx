import React from 'react';

type CheckboxButtonProps = {
  checked: boolean;
  onCheck: () => void;
};

export default function CheckboxButton({ checked, onCheck }: CheckboxButtonProps) {
  return (
    <label className="items-center cursor-pointer mt-5">
      <input type="checkbox" checked={checked} onChange={onCheck} className="sr-only" />
      <div
        className={`
      w-5 h-5
      rounded
      inline-block
      border-2
      transition-colors
      
      ${checked ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'bg-transparent border-[var(--color-gray)]'}
    `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="ml-2 text-[1rem] text-[var(--color-secondary)] align-top">개인정보 수집 및 이용 약관에 동의합니다</span>
    </label>
  );
}
