'use server';

import { ApiResPromise } from '@/types/api';
import { QuestionItem } from '@/types/qna';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * Q&A id에 해당하는 Q&A를 삭제함
 * @param {number} _id - Q&A id
 * @returns {Promise<ApiRes>} - Q&A id에 해당하는 Q&A 응답 객체
 */
export async function deleteQnA(_id: number): ApiResPromise<QuestionItem> {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await fetch(`${API_URL}/posts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: 'Q&A 삭제에 실패했습니다.' };
  }
}
