'use server';

import { ApiRes, ApiResPromise } from '@/types/api';
import { ReviewItem } from '@/types/review';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * 구매 후기 id에 해당하는 구매 후기를 삭제함
 * @param {number} _id - 구매 후기 id
 * @returns {Promise<ApiRes>} - 구매 후기 id에 해당하는 구매 후기 응답 객체
 */
export async function deleteReview(_id: number): ApiResPromise<ReviewItem> {
  let data: ApiRes<ReviewItem>;
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '구매 후기 삭제에 실패했습니다.' };
  }

  if (data.ok) {
    revalidateTag('review-list');
  }
  return data;
}
