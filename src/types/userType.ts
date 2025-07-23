export interface User {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  type: 'user' | 'seller' | 'admin'; // 사용자 유형
  loginType?: 'email' | 'kakao' | 'google' | 'github'; // 로그인 방식
  image?: string; // 프로필 이미지
  token?: {
    // 인증 토큰
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
  };
  createdAt?: string; // 생성일
  updatedAt?: string; // 수정일
}

export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// Record<K, T>: K(key)로 이루어진 객체의 각 속성의 타입을 T로 지정하는 유틸리티 타입
// Partial<T>: T의 모든 속성을 옵셔널로 지정하는 유틸리티 타입
// E: 검증에 사용될 속성값을 가지고 있는 타입
// 예) 검증에 사용될 속성값을 가지고 있는 타입이 { title: string, content: string } 이면,
// keyof E의 타입은 "title" | "content"
export type ServerValidationErrors<E> = Partial<Record<keyof E, ServerValidationError>>;

// API 서버의 응답
// E = never: E가 생략되면 errors 속성도 없음
export type ApiRes<T, E = never> = { ok: 1; item: T } | { ok: 0; message: string; errors?: ServerValidationErrors<E> };

// 서버 함수에서 반환할 타입(Promise를 반환해야 함)
export type ApiResPromise<T> = Promise<ApiRes<T>>;
