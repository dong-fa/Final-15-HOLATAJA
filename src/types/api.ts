// API 서버 응답
export type ApiRes<T> = { ok: 1; item: T } | { ok: 0; message: string };

// 서버 함수에서 반환할 타입 (Promise)
export type ApiResPromise<T> = Promise<ApiRes<T>>;
