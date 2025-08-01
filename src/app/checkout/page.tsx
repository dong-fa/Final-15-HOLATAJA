import getCartList from '@/data/functions/carts';
import getProduct from '@/data/functions/product';
import CheckOutForm from './CheckOutForm';
import { cookies } from 'next/headers';
import Link from 'next/link';

interface CheckoutPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  // API 호출을 위해 쿠키에서 토큰 가져오기
  const cookie = (await cookies()).get('accessToken');
  const token = cookie ? cookie.value : '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  console.log('결제 페이지 searchParams:', params);

  let orderData;

  // 1. 장바구니에서 온 경우 또는 기본 경우
  if (params.from === 'cart' || !params.from) {
    console.log('장바구니에서 결제 페이지로 이동');

    const cartRes = await getCartList(token);
    orderData =
      cartRes.ok === 1
        ? {
            products:
              cartRes.item?.map(item => ({
                id: item.product_id,
                name: item.product.name,
                image: `${API_URL}/${item.product.image.path}` || '',
                options: item.color,
                quantity: item.quantity,
                price: item.product.price,
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
  }

  // 2. 상품 상세에서 온 경우 (기존 URL 형태)
  else if (params.from === 'info' && params.product_id) {
    console.log('상품 상세에서 결제 페이지로 이동');

    try {
      const productRes = await getProduct(Number(params.product_id));

      if (productRes.ok === 1 && productRes.item) {
        const product = productRes.item;

        // 기본값으로 생성 (클라이언트에서 sessionStorage로 업데이트 예정)
        const productPrice = product.price;
        const quantity = 1; // 기본값
        const subtotal = productPrice * quantity;
        const shippingFee = product.shippingFees || (subtotal >= 50000 ? 0 : 3000);

        orderData = {
          products: [
            {
              id: product._id,
              name: product.name,
              image: product.mainImages && product.mainImages.length > 0 ? `${API_URL}/${product.mainImages[0].path}` : '',
              options: product.extra.option && product.extra.option.length > 0 ? product.extra.option[0] : '',
              quantity: quantity,
              price: productPrice,
            },
          ],
          subtotal: subtotal,
          shippingFee: shippingFee,
          total: subtotal + shippingFee,
        };
      } else {
        orderData = {
          products: [],
          subtotal: 0,
          shippingFee: 0,
          total: 0,
        };
      }
    } catch (error) {
      console.error('상품 정보 조회 실패:', error);
      orderData = {
        products: [],
        subtotal: 0,
        shippingFee: 0,
        total: 0,
      };
    }
  }

  // 결제할 상품이 없는 경우
  if (!orderData || orderData.products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">결제할 상품이 없습니다</h2>
          <p className="text-gray-600 mb-6">장바구니에 상품을 담거나 상품을 선택해주세요.</p>
          <div className="space-y-4">
            <Link href="/products" className="block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
              상품 둘러보기
            </Link>
            <Link href="/cart" className="block bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300">
              장바구니 확인
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
      {/* 페이지 제목 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">결제</h1>
      <CheckOutForm token={token} orderInfo={orderData} />
    </div>
  );
}
