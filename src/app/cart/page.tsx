import CartContainer from './components/CartContainer';
import { Title } from '@/components/Typography';

// 장바구니 상품 데이터 타입 정의 (실제로는 DB 스키마와 일치해야 함)
interface CartItemData {
  id: string; // 상품 고유 ID
  name: string; // 상품명
  options: string; // 상품 옵션 정보
  price: number; // 상품 가격
  quantity: number; // 수량
  image: string; // 상품 이미지 경로
}

/**
 * 서버에서 장바구니 데이터를 가져오는 함수
 * 실제 프로젝트에서는 다음과 같이 구현:
 * - 사용자 인증 정보 확인
 * - 데이터베이스에서 해당 사용자의 장바구니 조회
 * - API 호출 또는 ORM을 통한 데이터 페칭
 * @returns Promise<CartItemData[]> - 장바구니 아이템 배열
 */
async function getCartItems(): Promise<CartItemData[]> {
  // TODO: 실제 구현에서는 아래와 같이 구현
  // const session = await getSession(); // 사용자 세션 확인
  // const cartItems = await db.cartItem.findMany({
  //   where: { userId: session.user.id },
  //   include: { product: true }
  // });
  // return cartItems;

  // 현재는 더미 데이터 반환 (개발/테스트용)
  return [
    {
      id: '1',
      name: 'Mechanical Keyboard',
      options: '갈축 / 검정색',
      price: 150000,
      quantity: 2,
      image: '/images/keyboard.jpg', // public 폴더 내 실제 이미지 경로로 변경 필요
    },
    {
      id: '2',
      name: 'Keycaps Set',
      options: '우색',
      price: 150000,
      quantity: 2,
      image: '/images/keycaps.jpg', // public 폴더 내 실제 이미지 경로로 변경 필요
    },
    {
      id: '3',
      name: 'Wrist Rest',
      options: '갈축 / 검정색',
      price: 150000,
      quantity: 2,
      image: '/images/wrist-rest.jpg', // public 폴더 내 실제 이미지 경로로 변경 필요
    },
  ];
}

/**
 * 장바구니 페이지 서버 컴포넌트
 */
export default async function CartPage() {
  // 서버에서 장바구니 초기 데이터 로드
  const initialItems = await getCartItems();

  return (
    <div className="bg-gray-50 py-3 sm:py-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* 페이지 제목 */}
        <Title className="title">장바구니</Title>
        {/* <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">장바구니</h1> */}

        {/* 클라이언트 컴포넌트로 상태 관리 위임 */}
        <CartContainer initialItems={initialItems} />
      </div>
    </div>
  );
}
