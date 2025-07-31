import getCartList from '@/data/functions/carts';
import CheckOutForm from './CheckOutForm';
import { cookies } from 'next/headers';

export default async function CheckoutPage() {
  //API 호출을 위해 쿠키에서 토큰 가져오기
  const cookie = (await cookies()).get('accessToken');
  const token = cookie ? cookie.value : '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //장바구니 정보 가져오기
  const cartRes = await getCartList(token);
  const orderData =
    cartRes.ok === 1
      ? {
          products:
            cartRes.item?.map(item => ({
              id: item.product_id, // 상품 ID
              name: item.product.name, // 상품명 (product 객체에서)
              image: `${API_URL}/${item.product.image.path}` || '', // 상품 이미지 경로 (string)
              options: item.color, // 선택한 옵션 (색상)
              quantity: item.quantity, // 수량
              price: item.product.price, // 상품 가격 (product 객체에서)
            })) || [],
          subtotal: cartRes.cost?.products || 0,
          shippingFee: cartRes.cost?.shippingFees || 0,
          total: cartRes.cost?.total || 0,
        }
      : {
          products: [],
          subtotal: 0,
          shippingFee: 0,
          total: 0,
        };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
      {/* 페이지 제목 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">결제</h1>
      <CheckOutForm token={token} orderInfo={orderData} />
    </div>
  );
}
