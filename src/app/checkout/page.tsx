'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';

// 결제 방법의 타입을 정의 (간편결제, 체크/신용카드 결제, 무통장입급)
type PaymentMethod = 'simple' | 'card' | 'bank';

// 간편결제 옵션들의 타입 정의
type SimplePaymentOption = 'toss' | 'naver';

/**
 * 결제 페이지 컴포넌트
 * /checkout 경로에서 표시되는 메인 결제 페이지
 */
export default function CheckoutPage() {
  // 현재 선택된 결제 방법을 관리하는 상태
  // 기본값은 'simple' (간편결제)
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

  /**
   * 결제 방법 탭을 변경하는 함수
   * @param method - 선택할 결제 방법 ('simple', 'card', 'bank')
   */
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setActivePaymentMethod(method);
    console.log(`결제 방법이 ${method}로 변경되었습니다.`);
  };

  /**
   * 간편결제 옵션을 변경하는 함수
   * @param option - 선택할 간편결제 옵션 ('toss', 'naver')
   */
  const handleSimplePaymentChange = (option: SimplePaymentOption) => {
    setSelectedSimplePayment(option);
    console.log(`간편결제 옵션이 ${option}로 변경되었습니다.`);
  };

  /**
   * 카드 정보 입력 필드를 업데이트하는 함수
   * @param field - 업데이트할 필드명
   * @param value - 새로운 값
   */
  const handleCardInfoChange = (field: keyof typeof cardInfo, value: string) => {
    setCardInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 무통장 입금 정보를 업데이트하는 함수
   * @param field - 업데이트할 필드명
   * @param value - 새로운 값
   */
  const handleBankInfoChange = (field: keyof typeof bankInfo, value: string) => {
    setBankInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 간편결제 탭의 내용을 렌더링하는 함수
   * 토스페이, 네이버페이 등의 간편결제 옵션을 표시
   */
  const renderSimplePaymentContent = () => {
    return (
      <div className="tab-content p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">간편결제 선택</h4>

        {/* 토스페이 옵션 */}
        <div className="payment-option mb-3 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
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
        <div className="payment-option mb-3 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
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
   * 카드 번호, 유효기간, CVC 등의 입력 필드를 표시
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
          {/* 유효기간 입력 */}
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

          {/* CVC 입력 */}
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
   * 은행 선택, 입금자명 등의 정보를 표시
   */
  const renderBankPaymentContent = () => {
    return (
      <div className="tab-content p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">무통장 입금 정보</h4>

        {/* 은행 선택 */}
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

        {/* 입금자명 입력 */}
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

        {/* 입금 계좌 정보 (선택된 은행이 있을 때만 표시) */}
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
   * switch문을 사용하여 각 결제 방법별로 다른 컨텐츠를 반환
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
        // 예상치 못한 경우를 대비한 기본값
        return <div>결제 방법을 선택해주세요.</div>;
    }
  };

  /**
   * 최종 결제 버튼 클릭 시 실행되는 함수
   * 실제 결제 처리 로직이 들어갈 곳
   */
  const handleCheckout = () => {
    // 여기에 실제 결제 처리 로직을 구현
    console.log('결제 처리 시작');
    console.log('선택된 결제 방법:', activePaymentMethod);

    // 각 결제 방법에 따른 처리
    switch (activePaymentMethod) {
      case 'simple':
        console.log('간편결제 선택:', selectedSimplePayment);
        break;
      case 'card':
        console.log('카드 정보:', cardInfo);
        break;
      case 'bank':
        console.log('무통장 입금 정보:', bankInfo);
        break;
    }

    // 실제로는 여기서 결제 API를 호출하거나 결제 SDK를 사용
    alert('결제가 처리되었습니다!');
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
              <p className="font-medium">박철환</p>
              <p>010-천하회-게이징짱</p>
              <p>서울특별시 송 비번 동네 200층레이 아파트</p>
              <p>우) 00000</p>
            </div>
          </div>
          {/* 배송지 변경 버튼 - Button 컴포넌트 사용 */}
          <Button size="small" outlined onClick={() => alert('배송지 변경 기능')}>
            변경하기
          </Button>
        </div>
      </div>

      {/* 주문 상품 정보 섹션 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">주문 상품</h2>

        {/* 상품 목록 */}
        <div className="space-y-4">
          {/* 첫 번째 상품 */}
          <div className="flex items-center space-x-4">
            <Image
              src="/product_images/nuphy_kick75/nuphy_kick75_detail_01.webp"
              alt="NuPhy Kick75 상세 이미지 1"
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium">타게 버텍 키보드 한국에서 들여와서 배송은 땀 오래 걸림</h3>
              <p className="text-sm text-gray-500">옵션: 갈축 / 흰색</p>
              <p className="text-sm text-gray-500">1개</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">1,200,000원</p>
            </div>
          </div>

          {/* 두 번째 상품 */}
          <div className="flex items-center space-x-4">
            <Image
              src="/product_images/nuphy_halo75/nuphy_halo75_detail_01.webp"
              alt="NuPhy halo75 상세 이미지 1"
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium">조금 싼 키보드 중국에서 만들어서 배송은 더 오래 걸림수도 대충</h3>
              <p className="text-sm text-gray-500">옵션: 갈축 / 흰색</p>
              <p className="text-sm text-gray-500">2개</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">30,000원</p>
            </div>
          </div>
        </div>

        {/* 주문 금액 요약 */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">상품 금액</span>
            <span>1,230,000원</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">배송비</span>
            <span>3,000원</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>주문 금액</span>
            <span>1,233,000원</span>
          </div>
        </div>
      </div>

      {/* 결제 수단 선택 섹션 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 수단</h2>

        {/* 결제 방법 탭 헤더 - Button 컴포넌트들 사용 */}
        <div className="flex space-x-2 mb-6">
          {/* 간편결제 탭 버튼 */}
          <Button
            size="medium"
            select={activePaymentMethod === 'simple'} // 현재 선택된 탭이면 select 스타일
            outlined={activePaymentMethod !== 'simple'} // 선택되지 않은 탭이면 outlined 스타일
            onClick={() => handlePaymentMethodChange('simple')}
          >
            간편결제
          </Button>

          {/* 카드 결제 탭 버튼 */}
          <Button
            size="medium"
            select={activePaymentMethod === 'card'}
            outlined={activePaymentMethod !== 'card'}
            onClick={() => handlePaymentMethodChange('card')}
          >
            제휴/신용카드 결제
          </Button>

          {/* 무통장 입금 탭 버튼 */}
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
          // 결제 정보가 모두 입력되었는지 확인하여 disabled 설정
          disabled={
            (activePaymentMethod === 'card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvc)) ||
            (activePaymentMethod === 'bank' && (!bankInfo.selectedBank || !bankInfo.depositorName))
          }
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}
