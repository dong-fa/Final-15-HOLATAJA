import { ApiResPromise } from '@/types/api';
import { CartResponse } from '@/types/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

export default async function getCartList(token: string): ApiResPromise<CartResponse> {
  try {
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다' };
    }
    const response = await fetch(`${API_URL}/carts`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: 'force-cache',
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '장바구니 목록 조회에 실패 했습니다.' };
  }
}
