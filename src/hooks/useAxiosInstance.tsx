import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: API_URL, // 기본 URL
    // timeout: 1000 * 5,
    headers: {
      'client-id': process.env.NEXT_PUBLIC_API_CLIENT_ID,
      'Content-Type': 'application/json', // 요청 바디의 데이터 타입
      Accept: 'application/json', // 응답 바디의 데이터 타입이 json으로 달라는 뜻
    },
  });

  // 요청 전 인터셉터: localStorage에 저장된 토큰 헤더에 추가
  instance.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  });

  return instance;
}

export default useAxiosInstance;
