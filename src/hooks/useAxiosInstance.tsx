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

  //에러 핸들링 + 토큰 저장
  instance.interceptors.response.use(
    response => {
      console.log('API 응답성공', response.data);
      return response;
    },

    error => {
      console.error('API 에러', error);

      if (error.response) {
        const { status, data } = error.response;
        alert(`서버 에러 (${status}): ${data.message || '알 수 없는 오류가 발생했습니다'}`);
      }
      return Promise.reject(error);
    },
  );
  return instance;
}

export default useAxiosInstance;
