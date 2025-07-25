import { Title } from '@/components/Typography';
import getCartList from '@/data/functions/carts';
import { cookies } from 'next/headers';

/**
 * 장바구니 페이지 서버 컴포넌트
 */
export default async function CartPage() {
  // 서버에서 쿠키로부터 토큰 가져오기
  const cookieStore = cookies();
  const token = (await cookieStore).get('accessToken')?.value;

  let cartData = null;
  if (token) {
    cartData = await getCartList(token);
  }
  console.log(cartData);

  return (
    <div className="bg-gray-50 py-3 sm:py-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Title className="title">장바구니</Title>
        {cartData && cartData.ok ? <div>장바구니 조회 성공</div> : <div>로그인이 필요합니다.</div>}
      </div>
    </div>
  );
}
