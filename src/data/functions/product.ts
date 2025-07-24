import { ApiResPromise } from '@/types/api';
import { ProductInfo } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

// 상품 상세 조회
export default async function getProduct(_id: number): ApiResPromise<ProductInfo> {
  try {
    const response = await fetch(`${API_URL}/products/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '상품 상세 조회에 실패했습니다.' };
  }
}
