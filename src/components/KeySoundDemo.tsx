'use client';

import SoundToggle from '@/components/SoundToggle';
import { useEffect, useState, useCallback } from 'react';

// interface KeyboardType {
//   keyboardLayout: 96 | 75 | 65 | 60;
//   switchType: 'blue' | 'brown' | 'red' | 'other';
// }

export default function KeySoundDemo(/* { keyboardLayout, switchType }: KeyboardType */) {
  // const layoutType = keyboardLayout;

  // 상단 숫자 키 배열
  const keysToRender = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  // 현재 눌려있는 키들을 추적하기 위한 Set 객체

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [useDemo, setUseDemo] = useState(false);

  // 사운드 재생 로직을 별도 함수로 분리
  const playKeySound = useCallback(() => {
    if (useDemo) {
      const audio = new Audio('/sounds/keyboardSound_sample.m4a');
      audio.play().catch(err => {
        console.error('Sound play error:', err);
      });
    }
  }, [useDemo]);

  // 전역 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 눌린 키가 우리가 렌더링한 키 목록에 포함되는지 확인
      if (keysToRender.includes(e.key) && !pressedKeys.has(e.key)) {
        // 이미 눌려있지 않은 경우에만 상태 업데이트
        setPressedKeys(prev => new Set(prev).add(e.key));
        playKeySound();
      }
    },
    [keysToRender, pressedKeys, playKeySound], // 의존성 배열에 필요한 상태와 함수 포함
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (keysToRender.includes(e.key)) {
        setPressedKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(e.key);
          return newSet;
        });
      }
    },
    [keysToRender],
  );

  // useEffect를 사용하여 컴포넌트 마운트/언마운트 시 전역 이벤트 리스너 등록/해제
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 클린업 함수: 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]); // 의존성 배열에 핸들러 함수를 포함

  // 마우스 클릭 이벤트 핸들러: 클릭된 키를 인자로 받아 처리
  const handleMouseDown = (key: string) => {
    setPressedKeys(prev => new Set(prev).add(key));
    playKeySound();
  };
  const handleMouseStop = (key: string) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <SoundToggle defaultOn={false} onChange={setUseDemo} />
      <div className="flex space-x-2 mt-8">
        {keysToRender.map(key => (
          <button
            key={key}
            className={`
              relative px-4 py-3 min-w-12 h-12
              border border-gray-300 
              rounded-lg text-sm font-medium text-text
              transition-all duration-75 ease-out
              ${pressedKeys.has(key) ? 'bg-gray-300 translate-y-0.5 shadow-sm' : 'bg-white translate-y-0 shadow-md hover:shadow-lg'}
              before:absolute before:inset-0 before:rounded-lg before:border before:border-gray-200
              hover:bg-gray-100 active:bg-gray-300 focus:ring-gray-500 
              `}
            onMouseDown={() => handleMouseDown(key)}
            onMouseUp={() => handleMouseStop(key)}
            onMouseLeave={() => handleMouseStop(key)}
          >
            <span className="relative z-10">{key}</span>
          </button>
        ))}
      </div>{' '}
    </div>
  );
}
