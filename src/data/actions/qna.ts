'use server';

import { ApiRes, ApiResPromise } from '@/types/api';
import { QuestionItem } from '@/types/qna';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * 입력된 제목과 내용으로 이루어진 질문 게시글을 등록함
 * @param {ApiRes<QuestionItem> | null} state - 이전 상태 (사용 X)
 * @param {FormData} formData - 질문 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<QuestionItem>} - 질문 게시글 생성 결과 응답 객체
 */
export async function postQuestion(state: ApiRes<QuestionItem> | null, formData: FormData): ApiResPromise<QuestionItem> {
  let data: ApiRes<QuestionItem>;
  const accessToken = (await cookies()).get('accessToken')?.value;
  // FormData를 일반 Object로 변환: 모든 값이 string이 되므로 상품 id는 Number로 다시 변환
  const body = { ...Object.fromEntries(formData), product_id: Number(formData.get('product_id')) };

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: 'Q&A 등록에 실패했습니다.' };
  }

  if (data.ok) {
    // 캐시 갱신
    revalidateTag('qna-list');
  }
  return data;
}

/**
 * Q&A id에 해당하는 Q&A를 삭제함
 * @param {number} _id - Q&A id
 * @returns {Promise<ApiRes>} - Q&A id에 해당하는 Q&A 응답 객체
 */
export async function deleteQnA(_id: number): ApiResPromise<QuestionItem> {
  let data: ApiRes<QuestionItem>;
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await fetch(`${API_URL}/posts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: 'Q&A 삭제에 실패했습니다.' };
  }

  if (data.ok) {
    revalidateTag('qna-list');
  }
  return data;
}
