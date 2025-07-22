'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';
import Select from '@/components/Select';
import Input from '@/components/Input';

// -----------------------------
// 타입 및 인터페이스 정의
// -----------------------------

// 결제 방식 타입
type PaymentMethod = 'simple' | 'card' | 'bank';
// 간편결제 옵션 타입
type SimplePaymentOption = 'toss' | 'naver';

// 배송지 정보 타입
interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
}

// 상품 정보 타입
interface ProductInfo {
  id: string;
  name: string;
  image: string;
  options: string;
  quantity: number;
  price: number;
}

// 주문 정보 타입
interface OrderInfo {
  products: ProductInfo[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

// 결제 데이터 타입 (결제 완료 시 전달)
interface PaymentData {
  deliveryInfo: DeliveryInfo;
  orderInfo: OrderInfo;
  paymentMethod: PaymentMethod;
  paymentDetails: {
    type: PaymentMethod;
    option?: SimplePaymentOption;
    cardNumber?: string;
    expiryDate?: string;
    cvc?: string;
    cardPassword?: string;
    selectedBank?: string;
    depositorName?: string;
  };
}

// 컴포넌트 Props 타입
interface CheckoutPageProps {
  deliveryInfo?: DeliveryInfo;
  orderInfo?: OrderInfo;
  onDeliveryChange?: () => void;
  onPaymentComplete?: (paymentData: PaymentData) => void;
}

// -----------------------------
// CheckoutPage 컴포넌트
// -----------------------------
export default function CheckoutPage({ deliveryInfo, orderInfo, onPaymentComplete }: CheckoutPageProps) {
  // 결제 방법(탭) 상태
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>('simple');
  // 간편결제 옵션 상태
  const [selectedSimplePayment, setSelectedSimplePayment] = useState<SimplePaymentOption>('toss');
  // 카드 결제 정보 상태
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardPassword: '',
  });
  // 무통장 입금 정보 상태
  const [bankInfo, setBankInfo] = useState({
    selectedBank: '',
    depositorName: '',
  });
  // 결제 처리 중 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 기본 배송지 정보 (props가 없을 때 사용)
  const defaultDeliveryInfo: DeliveryInfo = {
    name: '박철환',
    phone: '010-1234-5678',
    address: '서울특별시 송파구 우리집',
    postalCode: '00000',
  };

  // 결제에만 사용하는 배송지 정보 state
  const [currentDeliveryInfo, setCurrentDeliveryInfo] = useState<DeliveryInfo>(deliveryInfo || defaultDeliveryInfo);

  // 배송지 수정 모드 상태
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  // 배송지 수정 입력값 상태 (수정 모드에서 사용)
  const [editDeliveryInfo, setEditDeliveryInfo] = useState<DeliveryInfo>(currentDeliveryInfo);

  // 기본 주문 정보 (props가 없을 때 사용)
  const defaultOrderInfo: OrderInfo = {
    products: [
      {
        id: '1',
        name: '타게 버텍 키보드 한국에서 들여와서 배송은 땀 오래 걸림',
        image: '/product_images/nuphy_kick75/nuphy_kick75_detail_01.webp',
        options: '갈축 / 흰색',
        quantity: 1,
        price: 1200000,
      },
      {
        id: '2',
        name: '조금 싼 키보드 중국에서 만들어서 배송은 더 오래 걸림수도 대충',
        image: '/product_images/nuphy_halo75/nuphy_halo75_detail_01.webp',
        options: '갈축 / 흰색',
        quantity: 2,
        price: 30000,
      },
    ],
    subtotal: 1230000,
    shippingFee: 3000,
    total: 1233000,
  };
  // 주문 정보는 수정하지 않으므로 변수로 관리
  const currentOrderInfo = orderInfo || defaultOrderInfo;

  // -----------------------------
  // 핸들러 함수들
  // -----------------------------

  // 결제 방법(탭) 변경
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setActivePaymentMethod(method);
  };

  // 간편결제 옵션 변경
  const handleSimplePaymentChange = (option: SimplePaymentOption) => {
    setSelectedSimplePayment(option);
  };

  // 카드 정보 입력 변경
  const handleCardInfoChange = (field: keyof typeof cardInfo, value: string) => {
    setCardInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 무통장 입금 정보 입력 변경
  const handleBankInfoChange = (field: keyof typeof bankInfo, value: string) => {
    setBankInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 배송지 변경 버튼 클릭 시 수정 모드로 전환
  const handleDeliveryChange = () => {
    setEditDeliveryInfo(currentDeliveryInfo); // 현재 배송지 정보로 초기화
    setIsEditingDelivery(true); // 수정 모드 활성화
  };

  // 배송지 입력값 변경 핸들러 (수정 모드에서 사용)
  const handleDeliveryInputChange = (field: keyof DeliveryInfo, value: string) => {
    setEditDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  // 배송지 저장 버튼 클릭 시
  const handleSaveDeliveryInfo = () => {
    setCurrentDeliveryInfo(editDeliveryInfo); // 수정된 정보 저장
    setIsEditingDelivery(false); // 수정 모드 종료
  };

  // 배송지 취소 버튼 클릭 시
  const handleCancelEdit = () => {
    setIsEditingDelivery(false); // 수정 모드 종료
  };

  // 금액 포맷팅 함수 (숫자를 "1,000원" 형태로 변환)
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  // -----------------------------
  // 결제 탭별 렌더 함수
  // -----------------------------

  // 간편결제 탭 내용
  const renderSimplePaymentContent = () => (
    <div className="tab-content p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-4">간편결제 선택</h4>
      {/* 토스페이 옵션 */}
      <div className="payment-option mb-3 p-2 sm:p-3 cursor-pointer">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="simplePayment"
            value="toss"
            checked={selectedSimplePayment === 'toss'}
            onChange={() => handleSimplePaymentChange('toss')}
            className="mr-2 sm:mr-3"
          />
          <div className="flex items-center">
            <Image
              src="/toss-logo.png"
              alt="토스페이"
              width={123.88}
              height={24}
              className="w-[80px] sm:w-[123.88px] h-[16px] sm:h-[24px] object-contain"
            />
            <span className="text-sm sm:text-base font-medium px-2 sm:px-[15.12px] pt-1.5 text-[var(--color-primary)]">토스페이</span>
          </div>
        </label>
      </div>
      {/* 네이버페이 옵션 */}
      <div className="payment-option mb-3 p-2 sm:p-3 cursor-pointer">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="simplePayment"
            value="naver"
            checked={selectedSimplePayment === 'naver'}
            onChange={() => handleSimplePaymentChange('naver')}
            className="mr-2 sm:mr-3"
          />
          <div className="flex items-center">
            <Image
              src="/npay-logo.png"
              alt="네이버페이"
              width={82.08}
              height={28}
              className="w-[55px] sm:w-[82.08px] h-[19px] sm:h-[28px] object-contain"
            />
            <span className="text-sm sm:text-base font-medium px-4 sm:px-[55.92px] pt-1.5 text-[var(--color-primary)]">네이버페이</span>
          </div>
        </label>
      </div>
    </div>
  );

  // 카드 결제 탭 내용
  const renderCardPaymentContent = () => (
    <div className="tab-content p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-4">카드 정보 입력</h4>
      {/* 카드 번호 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="cardNumber">
          카드 번호
        </label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="0000-0000-0000-0000"
          maxLength={19}
          value={cardInfo.cardNumber}
          onChange={e => handleCardInfoChange('cardNumber', e.target.value)}
        />
      </div>
      {/* 유효기간 & CVC */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="expiryTitle">
            유효기간
          </label>
          <Input
            id="expiryTitle"
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={cardInfo.expiryDate}
            onChange={e => handleCardInfoChange('expiryDate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="cvcNumber">
            CVC
          </label>
          <Input
            id="cvcNumber"
            type="text"
            placeholder="000"
            maxLength={3}
            value={cardInfo.cvc}
            onChange={e => handleCardInfoChange('cvc', e.target.value)}
          />
        </div>
      </div>
      {/* 카드 비밀번호 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="pwdNumber">
          카드 비밀번호 앞 2자리
        </label>
        <Input
          id="pwdNumber"
          type="password"
          placeholder="**"
          maxLength={2}
          value={cardInfo.cardPassword}
          onChange={e => handleCardInfoChange('cardPassword', e.target.value)}
        />
      </div>
    </div>
  );

  // 무통장 입금 탭 내용
  const renderBankPaymentContent = () => {
    const bankOptions = ['국민은행', '신한은행', '우리은행', '하나은행', '농협', '카카오뱅크'];
    return (
      <div className="tab-content p-3 sm:p-4 rounded-lg">
        <h4 className="text-base sm:text-lg font-semibold mb-4">무통장 입금 정보</h4>
        {/* 은행 선택 */}
        <div className="mb-4">
          <Select
            label="입금 은행 선택"
            showLabel={true}
            options={bankOptions}
            id="selectedBank"
            name="selectedBank"
            selectedValue={bankInfo.selectedBank}
            onChange={e => handleBankInfoChange('selectedBank', e.target.value)}
            size="medium"
            placeholder="은행을 선택하세요"
            className="!w-full sm:!w-64 md:!w-48"
          />
        </div>
        {/* 입금자명 입력 */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg font-semibold mb-4">입금자명</h4>
          <label className="block text-sm font-medium mb-2" htmlFor="buyerName"></label>
          <Input
            id="buyerName"
            type="text"
            placeholder="입금자명을 입력하세요"
            value={bankInfo.depositorName}
            onChange={e => handleBankInfoChange('depositorName', e.target.value)}
          />
        </div>
        {/* 선택된 은행 계좌 정보 표시 */}
        {bankInfo.selectedBank && (
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h5 className="font-semibold mb-2 text-sm sm:text-base">입금 계좌 정보</h5>
            <p className="text-xs sm:text-sm text-gray-700">
              {bankInfo.selectedBank === '국민은행' && '국민은행 123-456-789012'}
              {bankInfo.selectedBank === '신한은행' && '신한은행 987-654-321098'}
              {bankInfo.selectedBank === '우리은행' && '우리은행 1002-123-456789'}
              {bankInfo.selectedBank === '하나은행' && '하나은행 111-222-333444'}
              {bankInfo.selectedBank === '농협은행' && '농협은행 999-888-777666'}
              {bankInfo.selectedBank === '카카오뱅크' && '카카오뱅크 3333-02-9023121'}
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">예금주: (주)올라타자</p>
          </div>
        )}
      </div>
    );
  };

  // 결제 방법에 따라 탭 내용 렌더링
  const renderActiveTabContent = () => {
    switch (activePaymentMethod) {
      case 'simple':
        return renderSimplePaymentContent();
      case 'card':
        return renderCardPaymentContent();
      case 'bank':
        return renderBankPaymentContent();
      default:
        return <div>결제 방법을 선택해주세요.</div>;
    }
  };

  // 결제 버튼 클릭 시 결제 데이터 생성 및 처리
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const paymentData: PaymentData = {
        deliveryInfo: currentDeliveryInfo,
        orderInfo: currentOrderInfo,
        paymentMethod: activePaymentMethod,
        paymentDetails:
          activePaymentMethod === 'simple'
            ? { type: 'simple', option: selectedSimplePayment }
            : activePaymentMethod === 'card'
              ? { type: 'card', ...cardInfo }
              : { type: 'bank', ...bankInfo },
      };
      // 결제 완료 콜백이 있으면 실행
      if (onPaymentComplete) {
        await onPaymentComplete(paymentData);
      } else {
        alert('결제가 처리되었습니다!');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('결제 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------
  // 렌더링 영역
  // -----------------------------
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
      {/* 페이지 제목 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">결제</h1>

      {/* 배송지 정보 섹션 */}
      <div className="p-3 sm:p-6 rounded-lg mb-6 sm:mb-8">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">배송지</h2>
            <div className="space-y-2 text-gray-700">
              {/* 배송지 수정 모드: 인풋 필드로 표시 */}
              {isEditingDelivery ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="recipientName">
                      수령인 이름
                    </label>
                    <Input
                      id="recipientName"
                      type="text"
                      value={editDeliveryInfo.name}
                      onChange={e => handleDeliveryInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="recipientPhoneNumber">
                      연락처
                    </label>
                    <Input
                      id="recipientPhoneNumber"
                      type="text"
                      value={editDeliveryInfo.phone}
                      onChange={e => handleDeliveryInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="recipientAddress">
                      주소
                    </label>
                    <Input
                      id="recipientAddress"
                      type="text"
                      value={editDeliveryInfo.address}
                      onChange={e => handleDeliveryInputChange('address', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="recipientPostCode">
                      우편번호
                    </label>
                    <Input
                      id="recipientPostCode"
                      type="text"
                      value={editDeliveryInfo.postalCode}
                      onChange={e => handleDeliveryInputChange('postalCode', e.target.value)}
                    />
                  </div>
                  {/* 저장/취소 버튼 */}
                  <div className="flex justify-end gap-4 mt-2">
                    <Button size="small" outlined onClick={handleCancelEdit}>
                      취소
                    </Button>
                    <Button size="small" onClick={handleSaveDeliveryInfo}>
                      저장
                    </Button>
                  </div>
                </>
              ) : (
                // 배송지 정보 표시
                <>
                  <p className="font-medium text-sm sm:text-base">{currentDeliveryInfo.name}</p>
                  <p className="text-sm sm:text-base">{currentDeliveryInfo.phone}</p>
                  <p className="text-sm sm:text-base">{currentDeliveryInfo.address}</p>
                  <p className="text-sm sm:text-base">우) {currentDeliveryInfo.postalCode}</p>
                </>
              )}
            </div>
          </div>
          {/* 변경하기 버튼: 수정 모드가 아닐 때만 표시 */}
          {!isEditingDelivery && (
            <div className="flex-shrink-0">
              <Button size="small" outlined onClick={handleDeliveryChange}>
                변경하기
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 주문 상품 정보 섹션 */}
      <div className="p-3 sm:p-6 rounded-lg mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">주문 상품</h2>
        <div className="space-y-3 sm:space-y-4">
          {currentOrderInfo.products.map(product => (
            <div key={product.id} className="flex items-center gap-3 sm:gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="sm:w-24 sm:h-24  object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm md:text-base">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">옵션: {product.options}</p>
                <p className="text-xs sm:text-sm text-gray-500">{product.quantity}개</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-semibold text-xs sm:text-sm md:text-base">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 주문 금액 요약 */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm sm:text-base">상품 금액</span>
            <span className="text-sm sm:text-base">{formatPrice(currentOrderInfo.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm sm:text-base">배송비</span>
            <span className="text-sm sm:text-base">{formatPrice(currentOrderInfo.shippingFee)}</span>
          </div>
          <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
            <span>주문 금액</span>
            <span>{formatPrice(currentOrderInfo.total)}</span>
          </div>
        </div>
      </div>

      {/* 결제 수단 선택 섹션 */}
      <div className="p-3 sm:p-6 rounded-lg mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">결제 수단</h2>
        {/* 결제 방법 탭 버튼 */}
        <div className="flex flex-col gap-4 sm:flex-row mb-6">
          <Button
            size="full"
            outlined={activePaymentMethod === 'simple'}
            select={activePaymentMethod === 'simple' ? false : true}
            onClick={() => handlePaymentMethodChange('simple')}
            // className="flex-1 text-xs sm:text-sm md:text-base px-1 sm:px-3"
          >
            간편결제
          </Button>
          <Button
            size="full"
            outlined={activePaymentMethod === 'card'}
            select={activePaymentMethod === 'card' ? false : true}
            onClick={() => handlePaymentMethodChange('card')}
            // className="flex-1 text-xs sm:text-sm md:text-base px-1 sm:px-3"
          >
            체크/신용카드 결제
          </Button>
          <Button
            size="full"
            outlined={activePaymentMethod === 'bank'}
            select={activePaymentMethod === 'bank' ? false : true}
            onClick={() => handlePaymentMethodChange('bank')}
            // className="flex-1 text-xs sm:text-sm md:text-base px-1 sm:px-3"
          >
            무통장 입금
          </Button>
        </div>
        {/* 선택된 결제 방법의 상세 입력 영역 */}
        <div className="tab-content-wrapper">{renderActiveTabContent()}</div>
      </div>

      {/* 최종 결제 버튼 */}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <Button
          size="medium"
          submit
          onClick={handleCheckout}
          disabled={
            isLoading ||
            (activePaymentMethod === 'card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvc)) ||
            (activePaymentMethod === 'bank' && (!bankInfo.selectedBank || !bankInfo.depositorName))
          }
          className="w-full sm:w-auto min-w-[120px]"
        >
          {isLoading ? '결제 처리 중...' : '결제하기'}
        </Button>
      </div>
    </div>
  );
}
