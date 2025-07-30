import { ApiResPromise } from '@/types/api';
import { CartItemData, CartResponse } from '@/types/cart';

// API 응답 기본 타입 정의
interface ApiBaseResponse {
  ok: number;
  message?: string;
}

// 장바구니 아이템 삭제 응답 타입
interface CartItemDeleteResponse extends ApiBaseResponse {
  deleted?: boolean; // 삭제 성공 여부 (성공시)
}

// 장바구니 아이템 추가 응답 타입
interface CartItemAddResponse extends ApiBaseResponse {
  item?: CartItemData; // 추가된 아이템 정보 (성공시)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';

/**
 * 장바구니 목록 조회 API 함수
 * 서버에서 사용자의 장바구니에 담긴 모든 상품들을 가져옵니다.
 *
 * @param token - JWT 인증 토큰 (Authorization 헤더에 Bearer 토큰으로 전송)
 * @returns 장바구니 데이터 (상품 목록, 총 비용 정보 포함)
 *
 * API 명세서 참고: GET /carts
 * - 헤더: Client-Id, Authorization
 * - 응답: { ok: number, item: CartItemData[], cost: CartTotalCost }
 */
export default async function getCartList(token: string): ApiResPromise<CartItemData[]> {
  console.log(' 장바구니 조회 api 시작:', { token: token?.slice(0, 20) + '...' });
  try {
    // 토큰 유효성 검사
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다' };
    }

    const response = await fetch(`${API_URL}/carts`, {
      method: 'GET',
      headers: {
        'Client-Id': CLIENT_ID, // API 클라이언트 식별자
        Authorization: `Bearer ${token}`, // JWT 토큰 인증
      },
      cache: 'no-cache', // 캐시 정책 설정
    });

    const result = await response.json();
    console.log('장바구니 조회 api 결과: ', result);

    // API 응답이 실패인 경우 그대로 반환
    if (result.ok !== 1) {
      return { ok: 0, message: result.message || '장바구니 조회 실패' };
    }

    return {
      ok: 1,
      item: result.item,
      cost: result.cost,
    };
  } catch (error) {
    // 네트워크 오류, 서버 오류 등의 예외 처리
    console.error('장바구니 목록 조회 오류:', error);
    return { ok: 0, message: '장바구니 목록 조회에 실패 했습니다.' };
  }
}

/**
 * 장바구니 아이템 삭제 API 함수
 * 장바구니에서 특정 상품을 완전히 제거합니다.
 *
 * @param token - JWT 인증 토큰
 * @param cartItemId - 삭제할 장바구니 아이템의 고유 ID
 * @returns API 응답 결과
 *
 * API 명세서 참고: DELETE /carts/{_id}
 * - 경로 매개변수: _id (장바구니 아이템 ID)
 * - 응답: 삭제 성공/실패 정보
 */
export async function removeCartItem(token: string, cartItemId: number): ApiResPromise<CartItemDeleteResponse> {
  console.log('상품 삭제 api 시작:', { cartItemId });
  try {
    // 토큰 유효성 검사
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다' };
    }

    // DELETE 요청으로 아이템 삭제
    const response = await fetch(`${API_URL}/carts/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log('상품 삭제 api 결과: ', result);

    // HTTP 상태 코드 확인
    if (!response.ok) {
      return {
        ok: 0,
        message: result.message || `상품 삭제에 실패했습니다. (${response.status})`,
      };
    }

    return result;
  } catch (error) {
    // 네트워크 오류 등 예외 처리
    console.error('장바구니 아이템 삭제 오류:', error);
    return { ok: 0, message: '상품 삭제에 실패했습니다.' };
  }
}

/**
 * 장바구니에 상품 추가 API 함수
 * 새로운 상품을 장바구니에 추가하거나 기존 상품의 수량을 증가시킵니다.
 *
 * @param token - JWT 인증 토큰
 * @param productId - 추가할 상품의 고유 ID
 * @param quantity - 추가할 수량 (기본값: 1)
 * @returns API 응답 결과
 *
 * API 명세서 참고: POST /carts
 * - 요청 본문: { product_id: number, quantity: number }
 * - 응답: 추가된 장바구니 아이템 정보
 */
export async function addToCart(token: string, productId: number, quantity: number = 1): ApiResPromise<CartItemAddResponse> {
  try {
    // 입력값 유효성 검사
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다' };
    }

    if (!productId || productId <= 0) {
      return { ok: 0, message: '유효한 상품 ID가 필요합니다' };
    }

    if (quantity < 1) {
      return { ok: 0, message: '수량은 1개 이상이어야 합니다' };
    }

    // POST 요청으로 장바구니에 상품 추가
    const response = await fetch(`${API_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId, // 상품 ID (API 명세서의 필드명 확인)
        quantity: quantity, // 추가할 수량
      }),
    });

    const result = await response.json();
    console.log('장바구니에 상품이 추가 되었습니다.', result);

    // HTTP 상태 코드 확인
    if (!response.ok) {
      return {
        ok: 0,
        message: result.message || `장바구니 추가에 실패했습니다. (${response.status})`,
      };
    }

    return result;
  } catch (error) {
    // 네트워크 오류 또는 서버 오류 등 예외 처리
    console.error('장바구니 추가 오류:', error);
    return { ok: 0, message: '장바구니 추가에 실패했습니다.' };
  }
}

/**
 * 장바구니 전체 비우기 API 함수 (선택적 구현)
 * 사용자의 장바구니에 담긴 모든 상품을 삭제합니다.
 *
 * @param token - JWT 인증 토큰
 * @returns API 응답 결과
 *
 * 참고: API 명세서에서 해당 엔드포인트 확인 필요
 * 보통 DELETE /carts 또는 POST /carts/clear 등의 형태
 */
export async function clearCart(token: string): Promise<{ ok: 0 | 1; message?: string }> {
  try {
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다' };
    }
    const cartData = await getCartList(token);

    if (cartData.ok === 1 && Array.isArray(cartData.item)) {
      const deletePromises = cartData.item.map((item: CartItemData) => removeCartItem(token, item._id));
      await Promise.all(deletePromises);
      // API 호출은 성공했지만 데이터 또는 API 실패 응답
      return { ok: 1, message: '장바구니가 비워졌습니다.' };
    }

    return { ok: 0, message: '장바구니 비우기에 실패했습니다.' };
  } catch (error) {
    // 네트워크 오류, 서버 오류 등의 예외
    console.error('장바구니 비우기 오류:', error);
    return { ok: 0, message: '네트워크 오류로 장바구니 비우기에 실패하였습니다..' };
  }
}

/**
 * 장바구니 아이템 수량 변경
 * @param token
 * @param cartItemId - 수정할 장바구니 고유 ID
 * @param quantity - 변경할 수량
 * @returns - API 응답 결과
 * API 명세: PATCH /carts/{id}
 * - 경로 매개변수: _id(장바구니 아이템 ID)
 * 요청: 브루노 확인 결과 {quantity: number}
 * 응답: 업데이트 된 장바구니 전체 정보
 */

export async function updateCartItemQuantity(token: string, cartItemId: number, quantity: number): ApiResPromise<CartResponse> {
  console.log('수량 변경 api 시작:', { cartItemId, quantity });
  try {
    if (!token) {
      return { ok: 0, message: '인증 토큰이 필요합니다.' };
    }

    if (quantity < 1) {
      return { ok: 0, message: '수량은 1개 이상이어야 합니다.' };
    }

    // PATCH 요청으로 수량 업데이트 =
    const response = await fetch(`${API_URL}/carts/${cartItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': `application/json`,
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });
    const result = await response.json();
    console.log('수량 변경 api 결과: ', result);

    // HTTP 상태 코드 확인
    if (!response.ok) {
      return {
        ok: 0,
        message: result.message || `수량 변경에 실패했습니다. (${response.status})`,
      };
    }
    return result;
  } catch (error) {
    console.error('장바구니 수량 변경 오류: ', error);
    return { ok: 0, message: '수량 변경에 실패했습니다.' };
  }
}
