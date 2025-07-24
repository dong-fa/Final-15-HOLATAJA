'use client';

import { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '@/components/Button';

interface CartItemData {
  id: string;
  name: string;
  options: string;
  price: number;
  quantity: number;
  image: string;
}

// 받는 Props
interface CartContainerProps {
  initialItems: CartItemData[]; // 서버에서 받은 초기 데이터
}

const SHIPPING_FEE = 3000;

export default function CartContainer({ initialItems }: CartContainerProps) {
  // 관리하는 state
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialItems);

  // 수량 변경 핸들러
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  // 상품 삭제 핸들러
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // 주문하기 핸들러
  const handleCheckout = () => {
    console.log('주문하기 버튼 클릭');
    // 실제 주문 로직 구현
    // 서버 액션 호출하거나 API 요청
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="flex flex-col gap-4">
      {/* 장바구니 아이템들 */}
      <div className="lg:col-span-2 space-y-3 sm:space-y-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
            <p className="text-gray-500 text-base sm:text-lg">장바구니가 비어있습니다.</p>
          </div>
        ) : (
          // CartItem 컴포넌트에 전달하는 데이터
          cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              options={item.options}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))
        )}
      </div>

      {/* 주문 요약 */}
      <div className="w-full">
        <div className="top-6 sm:top-8">
          <CartSummary subtotal={subtotal} shipping={SHIPPING_FEE} total={total} /> {/* CartSummary 컴포넌트에 전달하는 데이터 */}
        </div>
        <div className="flex justify-end w-full">
          <Button className="mt-4" size="medium" onClick={handleCheckout}>
            주문하기
          </Button>
        </div>
      </div>
    </div>
  );
}
