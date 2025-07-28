import { User } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { logout as serverLogout } from '@/data/actions/auth';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<UserState>(
    set => ({
      user: null,
      setUser: user => set({ user }),
      logout: async () => {
        // 클라이언트 상태 먼저 정리
        set({ user: null });

        // 서버 액션으로 쿠키 삭제 및 리다이렉트
        await serverLogout();
      },
    }),
    {
      name: 'user', //스토리지에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), //세션스토리지에 저장
    },
  ),
);

export default useAuthStore;
