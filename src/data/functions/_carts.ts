/**
 * 로그인한 사용자에 한해서 장바구니 조회가 가능해야함
 * @returns
 */
export async function getCart() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjI3LCJ0eXBlIjoidXNlciIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3NTMzMzM5MDUsImV4cCI6MTc1MzQyMDMwNSwiaXNzIjoiRkVCQyJ9.Cew_xJk8A5l76t1S1LIVmMX2s8Xl13PyJpDcB2iAnBc';
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 오류' };
  }
}
