import React from 'react';

type CheckboxButtonProps = {
  checked: boolean;
  onCheck: () => void;
};

export default function CheckboxButton({ checked, onCheck }: CheckboxButtonProps) {
  return (
    // flex로 감싸서 checkbox와 텍스트를 한 줄에 정렬
    <label className="mt-5 flex items-center cursor-pointer">
      {/* 
        기본 checkbox 
        - sr-only 제거 → 그대로 보임
        - accent-color로 색상 지정
        - w-5 h-5로 크기 지정
      */}
      <input type="checkbox" checked={checked} onChange={onCheck} className="w-5 h-5 " />

      {/* 오른쪽 텍스트 */}
      <span className="ml-2 text-[1rem] text-[var(--color-secondary)]">개인정보 수집 및 이용 약관에 동의합니다</span>
    </label>
  );
}
