import { ApiResPromise } from '@/types/api';
import { BookmarkData } from '@/types/bookmark';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * 전체 북마크 목록을 가져옴
 * @returns {Promise<ApiRes<BookmarkData[]>>} - 북마크 목록 응답 객체
 */
export async function getBookmarks(): ApiResPromise<BookmarkData[]> {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await fetch(`${API_URL}/bookmarks/product`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { tags: ['bookmark-list'] },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '북마크 목록 조회에 실패했습니다.' };
  }
}
