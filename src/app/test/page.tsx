'use client';
import SoundToggle from '@/components/SoundToggle';

export default function TestSoundTogglePage() {
  // 상태 변경 시 콘솔에 출력 예제
  const handleSoundChange = (value: boolean): void => {
    console.log('사운드 상태:', value ? 'ON' : 'OFF');
  };

  return (
    <div className="p-8">
      <h1 className="title mb-6">SoundToggle 테스트 페이지</h1>
      <SoundToggle defaultOn={false} onChange={handleSoundChange} />
    </div>
  );
}
