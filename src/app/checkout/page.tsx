'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';

// 결제 방법의 타입을 정의 (간편결제, 체크/신용카드 결제, 무통장입급)
type PaymentMethod = 'simple' | 'card' | 'bank';

// 간편결제 옵션들의 타입 정의
type SimplePaymentOption = 'toss' | 'naver';

/**
 * 배송지 정보 타입 정의
 * 주문자의 배송지 관련 정보를 담는 인터페이스
 */
interface DeliveryInfo {
  /** 수령인 이름 */
  name: string;
  /** 연락처 (휴대폰 번호) */
  phone: string;
  /** 배송 주소 */
  address: string;
  /** 우편번호 */
  postalCode: string;
}

// 결제 처리에 필요한 모든 정보를 담는 타입
interface PaymentData {
  deliveryInfo: DeliveryInfo; // 배송지 정보 (이름, 연락처, 주소, 우편번호 등)
  orderInfo: OrderInfo; // 주문 정보 (상품 목록, 금액 등)
  paymentMethod: PaymentMethod; // 결제 방법 ('simple', 'card', 'bank' 중 하나)
  paymentDetails: {
    // 결제 방법에 따라 달라지는 상세 정보
    type: PaymentMethod; // 실제 결제 타입 ('simple', 'card', 'bank')
    option?: SimplePaymentOption; // 간편결제일 때 선택된 옵션 ('toss' 또는 'naver')
    cardNumber?: string; // 카드 결제일 때 카드 번호
    expiryDate?: string; // 카드 결제일 때 유효기간
    cvc?: string; // 카드 결제일 때 CVC 번호
    cardPassword?: string; // 카드 결제일 때 카드 비밀번호 앞 2자리
    selectedBank?: string; // 무통장 입금일 때 선택한 은행
    depositorName?: string; // 무통장 입금일 때 입금자명
  };
}

/**
 * 상품 정보 타입 정의
 * 주문할 개별 상품의 정보를 담는 인터페이스
 */
interface ProductInfo {
  /** 상품 고유 ID */
  id: string;
  /** 상품명 */
  name: string;
  /** 상품 이미지 경로 */
  image: string;
  /** 선택한 상품 옵션 (색상, 사이즈 등) */
  options: string;
  /** 주문 수량 */
  quantity: number;
  /** 개별 상품 가격 */
  price: number;
}

/**
 * 주문 정보 타입 정의
 * 전체 주문에 대한 상품 목록과 금액 정보를 담는 인터페이스
 */
interface OrderInfo {
  /** 주문 상품 목록 */
  products: ProductInfo[];
  /** 상품 금액 합계 (배송비 제외) */
  subtotal: number;
  /** 배송비 */
  shippingFee: number;
  /** 총 주문 금액 (상품 금액 + 배송비) */
  total: number;
}

// CheckoutPage 컴포넌트의 Props 타입 정의
interface CheckoutPageProps {
  deliveryInfo?: DeliveryInfo;
  orderInfo?: OrderInfo;
  onDeliveryChange?: () => void;
  onPaymentComplete?: (paymentData: PaymentData) => void;
}

/**
 * 결제 페이지 컴포넌트
 * /checkout 경로에서 표시되는 메인 결제 페이지
 */
export default function CheckoutPage({ deliveryInfo, orderInfo, onDeliveryChange, onPaymentComplete }: CheckoutPageProps) {
  // 현재 선택된 결제 방법을 관리하는 상태
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>('simple');

  // 간편결제에서 선택된 옵션을 관리하는 상태
  const [selectedSimplePayment, setSelectedSimplePayment] = useState<SimplePaymentOption>('toss');

  // 카드 결제 정보를 관리하는 상태
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardPassword: '',
  });

  // 무통장 입금 정보를 관리하는 상태
  const [bankInfo, setBankInfo] = useState({
    selectedBank: '',
    depositorName: '',
  });

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // 기본값 설정 (Props로 받지 못한 경우를 대비)
  const defaultDeliveryInfo: DeliveryInfo = {
    name: '박철환',
    phone: '010-1234-5678',
    address: '서울특별시 송파구 우리집',
    postalCode: '00000',
  };

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

  // 실제 데이터 또는 기본값 사용
  const currentDeliveryInfo = deliveryInfo || defaultDeliveryInfo;
  const currentOrderInfo = orderInfo || defaultOrderInfo;

  /**
   * 결제 방법 탭을 변경하는 함수
   */
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setActivePaymentMethod(method);
    console.log(`결제 방법이 ${method}로 변경되었습니다.`);
  };

  /**
   * 간편결제 옵션을 변경하는 함수
   */
  const handleSimplePaymentChange = (option: SimplePaymentOption) => {
    setSelectedSimplePayment(option);
    console.log(`간편결제 옵션이 ${option}로 변경되었습니다.`);
  };

  /**
   * 카드 정보 입력 필드를 업데이트하는 함수
   */
  const handleCardInfoChange = (field: keyof typeof cardInfo, value: string) => {
    setCardInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 무통장 입금 정보를 업데이트하는 함수
   */
  const handleBankInfoChange = (field: keyof typeof bankInfo, value: string) => {
    setBankInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 배송지 변경 버튼 클릭 핸들러
   */
  const handleDeliveryChange = () => {
    if (onDeliveryChange) {
      onDeliveryChange();
    } else {
      // 기본 동작 (모달 열기, 다른 페이지로 이동 등)
      alert('배송지 변경 기능');
    }
  };

  /**
   * 금액 포맷팅 함수
   */
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  /**
   * 간편결제 탭의 내용을 렌더링하는 함수
   */
  const renderSimplePaymentContent = () => {
    return (
      <div className="tab-content p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">간편결제 선택</h4>

        {/* 토스페이 옵션 */}
        <div className="payment-option mb-3 p-3 cursor-pointer">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="simplePayment"
              value="toss"
              checked={selectedSimplePayment === 'toss'}
              onChange={() => handleSimplePaymentChange('toss')}
              className="mr-3"
            />
            <div className="flex items-center">
              <Image src="/toss-logo.png" alt="토스페이" width={123.88} height={24} className="w-[123.88px] h-[24px] object-contain" />
              <span className="text-base font-medium px-[15.12px] pt-1.5 text-[var(--color-primary)]">토스페이</span>
            </div>
          </label>
        </div>

        {/* 네이버페이 옵션 */}
        <div className="payment-option mb-3 p-3  cursor-pointer">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="simplePayment"
              value="naver"
              checked={selectedSimplePayment === 'naver'}
              onChange={() => handleSimplePaymentChange('naver')}
              className="mr-3"
            />
            <div className="flex items-center">
              <Image src="/npay-logo.png" alt="네이버페이" width={82.08} height={28} className="w-[82.08px] h-[28px] object-contain" />
              <span className="text-base font-medium px-[55.92px] pt-1.5 text-[var(--color-primary)]">네이버페이</span>
            </div>
          </label>
        </div>
      </div>
    );
  };

  /**
   * 카드 결제 탭의 내용을 렌더링하는 함수
   */
  const renderCardPaymentContent = () => {
    return (
      <div className="tab-content p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">카드 정보 입력</h4>

        {/* 카드 번호 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">카드 번호</label>
          <input
            type="text"
            placeholder="0000-0000-0000-0000"
            maxLength={19}
            value={cardInfo.cardNumber}
            onChange={e => handleCardInfoChange('cardNumber', e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 유효기간과 CVC를 한 줄에 배치 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">유효기간</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={cardInfo.expiryDate}
              onChange={e => handleCardInfoChange('expiryDate', e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVC</label>
            <input
              type="text"
              placeholder="000"
              maxLength={3}
              value={cardInfo.cvc}
              onChange={e => handleCardInfoChange('cvc', e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 카드 비밀번호 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">카드 비밀번호 앞 2자리</label>
          <input
            type="password"
            placeholder="**"
            maxLength={2}
            value={cardInfo.cardPassword}
            onChange={e => handleCardInfoChange('cardPassword', e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    );
  };

  /**
   * 무통장 입금 탭의 내용을 렌더링하는 함수
   */
  const renderBankPaymentContent = () => {
    return (
      <div className="tab-content p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">무통장 입금 정보</h4>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">입금 은행 선택</label>
          <select
            value={bankInfo.selectedBank}
            onChange={e => handleBankInfoChange('selectedBank', e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">은행을 선택하세요</option>
            <option value="kb">국민은행</option>
            <option value="shinhan">신한은행</option>
            <option value="woori">우리은행</option>
            <option value="hana">하나은행</option>
            <option value="nh">농협은행</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">입금자명</label>
          <input
            type="text"
            placeholder="입금자명을 입력하세요"
            value={bankInfo.depositorName}
            onChange={e => handleBankInfoChange('depositorName', e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {bankInfo.selectedBank && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">입금 계좌 정보</h5>
            <p className="text-sm text-gray-700">
              {bankInfo.selectedBank === 'kb' && '국민은행 123-456-789012'}
              {bankInfo.selectedBank === 'shinhan' && '신한은행 987-654-321098'}
              {bankInfo.selectedBank === 'woori' && '우리은행 1002-123-456789'}
              {bankInfo.selectedBank === 'hana' && '하나은행 111-222-333444'}
              {bankInfo.selectedBank === 'nh' && '농협은행 999-888-777666'}
            </p>
            <p className="text-sm text-gray-700 mt-1">예금주: (주)올라타자</p>
          </div>
        )}
      </div>
    );
  };

  /**
   * 현재 선택된 결제 방법에 따라 적절한 탭 내용을 렌더링하는 함수
   */
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

  /**
   * 최종 결제 버튼 클릭 시 실행되는 함수
   */
  const handleCheckout = async () => {
    setIsLoading(true); // 결제 처리 중임을 표시 (버튼 비활성화 등)

    try {
      // 결제에 필요한 모든 정보를 하나의 객체로 만듦
      const paymentData: PaymentData = {
        deliveryInfo: currentDeliveryInfo, // 배송지 정보 (이름, 연락처, 주소, 우편번호 등)
        orderInfo: currentOrderInfo, // 주문 정보 (상품 목록, 금액 등)
        paymentMethod: activePaymentMethod, // 현재 선택된 결제 방법 ('simple', 'card', 'bank')
        paymentDetails:
          activePaymentMethod === 'simple'
            ? // 간편결제일 때: type과 선택된 간편결제 옵션만 포함
              { type: 'simple' as PaymentMethod, option: selectedSimplePayment }
            : // 카드 결제일 때: type과 카드 정보(cardInfo) 포함
              activePaymentMethod === 'card'
              ? { type: 'card' as PaymentMethod, ...cardInfo }
              : // 무통장 입금일 때: type과 은행 정보(bankInfo) 포함
                { type: 'bank' as PaymentMethod, ...bankInfo },
      };

      // 결제 처리가 시작됐다는 로그와 결제 데이터를 콘솔에 출력
      console.log('결제 처리 시작', paymentData);

      if (onPaymentComplete) {
        // 만약 부모 컴포넌트에서 결제 완료 처리를 위한 함수를 props로 넘겨줬다면
        await onPaymentComplete(paymentData); // 그 함수를 실행해서 결제 데이터를 전달
      } else {
        // 부모에서 별도 처리가 없으면 기본 결제 처리 로직 실행
        // 실제 서비스에서는 여기서 결제 API를 호출해야 함
        alert('결제가 처리되었습니다!'); // 임시로 알림창만 띄움
      }
    } catch (error) {
      // 결제 처리 중 에러가 발생하면
      console.error('결제 처리 오류:', error); // 에러 내용을 콘솔에 출력
      alert('결제 처리 중 오류가 발생했습니다.'); // 사용자에게 에러 알림
    } finally {
      setIsLoading(false); // 결제 처리(성공/실패 상관없이) 끝나면 로딩 상태 해제
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* 페이지 제목 */}
      <h1 className="text-3xl font-bold mb-8">결제</h1>

      {/* 배송지 정보 섹션 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-4">배송지</h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">{currentDeliveryInfo.name}</p>
              <p>{currentDeliveryInfo.phone}</p>
              <p>{currentDeliveryInfo.address}</p>
              <p>우) {currentDeliveryInfo.postalCode}</p>
            </div>
          </div>
          <Button size="small" outlined onClick={handleDeliveryChange}>
            변경하기
          </Button>
        </div>
      </div>

      {/* 주문 상품 정보 섹션 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">주문 상품</h2>

        {/* 상품 목록 */}
        <div className="space-y-4">
          {currentOrderInfo.products.map(product => (
            <div key={product.id} className="flex items-center space-x-4">
              <Image src={product.image} alt={product.name} width={80} height={80} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">옵션: {product.options}</p>
                <p className="text-sm text-gray-500">{product.quantity}개</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 금액 요약 */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">상품 금액</span>
            <span>{formatPrice(currentOrderInfo.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">배송비</span>
            <span>{formatPrice(currentOrderInfo.shippingFee)}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>주문 금액</span>
            <span>{formatPrice(currentOrderInfo.total)}</span>
          </div>
        </div>
      </div>

      {/* 결제 수단 선택 섹션 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 수단</h2>

        {/* 결제 방법 탭 헤더 */}
        <div className="flex space-x-2 mb-6">
          <Button
            size="medium"
            select={activePaymentMethod === 'simple'}
            outlined={activePaymentMethod !== 'simple'}
            onClick={() => handlePaymentMethodChange('simple')}
          >
            간편결제
          </Button>
          <Button
            size="medium"
            select={activePaymentMethod === 'card'}
            outlined={activePaymentMethod !== 'card'}
            onClick={() => handlePaymentMethodChange('card')}
          >
            제휴/신용카드 결제
          </Button>
          <Button
            size="medium"
            select={activePaymentMethod === 'bank'}
            outlined={activePaymentMethod !== 'bank'}
            onClick={() => handlePaymentMethodChange('bank')}
          >
            무통장 입금
          </Button>
        </div>

        {/* 선택된 탭의 내용을 표시하는 영역 */}
        <div className="tab-content-wrapper">{renderActiveTabContent()}</div>
      </div>

      {/* 최종 결제 버튼 */}
      <div className="mt-8">
        <Button
          size="full"
          submit
          onClick={handleCheckout}
          disabled={
            isLoading ||
            (activePaymentMethod === 'card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvc)) ||
            (activePaymentMethod === 'bank' && (!bankInfo.selectedBank || !bankInfo.depositorName))
          }
        >
          {isLoading ? '결제 처리 중...' : '결제하기'}
        </Button>
      </div>
    </div>
  );
}
