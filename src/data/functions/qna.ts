import { ApiResPromise } from '@/types/api';
import { AnswerItem, QuestionItem } from '@/types/qna';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * 전체 Q&A 목록을 가져옴
 * @returns {Promise<ApiRes<QuestionItem[]>>} - Q&A 목록 응답 객체
 */
export async function getQuestion(): ApiResPromise<QuestionItem[]> {
  try {
    const response = await fetch(`${API_URL}/posts?type=qna`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '질문 목록 조회에 실패했습니다.' };
  }
}

/**
 * Q&A 게시글 id에 해당하는 답변 목록을 가져옴
 * @param {number} _id - Q&A 게시글 id
 * @returns {Promise<ApiRes<AnswerItem[]>>} - 답변 목록 응답 객체
 */
export async function getAnswer(_id: number): ApiResPromise<AnswerItem[]> {
  try {
    const response = await fetch(`${API_URL}/posts/${_id}/replies`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '답변 조회에 실패했습니다.' };
  }
}
