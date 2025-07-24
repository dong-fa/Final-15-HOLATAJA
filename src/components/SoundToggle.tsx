'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  defaultOn?: boolean; // 초기 ON/OFF 상태
  onChange?: (value: boolean) => void; // 상태 변경 시 실행될 콜백
}

export default function SoundToggle({ defaultOn = false, onChange }: SoundToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(defaultOn);

  const handleToggle = (): void => {
    const next = !isOn;
    setIsOn(next);
    if (onChange) {
      onChange(next);
    }
  };

  // defaultOn 값이 바뀌면 내부 상태도 동기화 (선택 사항)
  useEffect(() => {
    setIsOn(defaultOn);
  }, [defaultOn]);

  return (
    <div className="inline-flex flex-col items-center p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <span className="label-m mr-2">OFF</span>

        <button
          onClick={handleToggle}
          className={`relative w-14 h-8 rounded-full transition-colors duration-300
            ${isOn ? 'bg-primary border-2 border-primary' : 'bg-gray-400 border-2 border-gray-400'}`}
        >
          <span
            className={`absolute top-[2px] left-[2px] w-6 h-6 bg-white rounded-full transition-transform duration-300
              ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </button>

        <span className="label-m ml-2">ON</span>
      </div>

      <div className="flex items-center">
        {isOn ? (
          <>
            <Volume2 size={24} className="text-primary" />
            <span className="label-m ml-2 text-primary font-bold">사운드 켜짐</span>
          </>
        ) : (
          <>
            <VolumeX size={24} className="text-gray-500" />
            <span className="label-m ml-2 text-text">사운드 꺼짐</span>
          </>
        )}
      </div>
    </div>
  );
}
