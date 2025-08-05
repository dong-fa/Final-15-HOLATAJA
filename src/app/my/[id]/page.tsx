import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrderItem } from '@/types/order';

import OrderedCard from '@/components/OrderdCard';
import { getOrderInfo } from '@/data/functions/order';
import { SubTitle, Title } from '@/components/Typography';
import { getAccountByBank, getOrderStatusLabel } from '@/data/tables/mappingTables';

export const metadata: Metadata = {
  title: '주문 내역 상세  - HOLATAJA',
  description: '고객님의 주문 내역을 확인하세요.',
  robots: 'noindex, nofollow',
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderInfoPage({ params }: PageProps) {
  const { id } = await params;
  const orderData = await getOrderInfo(Number(id));

  // 존재하지 않는 주문 정보면 404 처리
  if (orderData.ok === 0) {
    return notFound();
  }

  const orderInfo: OrderItem | null = orderData.ok === 1 ? orderData.item : null;
  if (!orderInfo) {
    return <div>주문 정보를 불러오지 못했습니다.</div>;
  }

  const bankInfo = orderInfo.payment.info.split('&')[0].trim();

  return (
    <>
      <nav className="text-sm text-gray-500 mb-2 flex flex-row">
        <Link href={`/my`} className="text-secondary hover:underline">
          Orders /
        </Link>
        <p className="mx-1 text-text">Order Details</p>
      </nav>
      <Title className="mb-4">구매 내역 상세</Title>
      <div className="flex flex-row justify-between mb-8">
        <div>
          <p className="text-secondary label-s">
            Order #{orderInfo._id} · 주문일시: {orderInfo.createdAt}
          </p>
        </div>
        <p className="label-s font-bold">{getOrderStatusLabel(orderInfo.state)}</p>
      </div>

      <SubTitle className="label-l mb-4">주문 상품</SubTitle>
      <section className="bg-white rounded-lg border-1 border-lightgray border-b-0">
        {orderInfo.products.map((product, index) => (
          <OrderedCard
            key={index}
            src={product.image?.path ? `${product.image.path}` : '/product_images/holataja_circle.webp'}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            option={orderInfo.options?.[index]?.option}
          />
        ))}
      </section>

      <SubTitle className="label-l mb-4 mt-8">배송지</SubTitle>
      <section className="bg-white rounded-lg border-1 border-lightgray">
        <div className="flex flex-col items-start px-4 py-7">
          <p className="font-bold text-sm sm:text-base">{orderInfo.address.name}</p>
          {orderInfo.address.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
          <p className="text-sm sm:text-base">{orderInfo.address.address}</p>
          <p className="text-sm sm:text-base">우편번호: {orderInfo.address.postalCode}</p>
        </div>
      </section>

      <SubTitle className="label-l mb-4 mt-8">결제 정보</SubTitle>
      <section className="bg-white rounded-lg border-1 border-lightgray">
        <div className="flex flex-col items-start px-4 py-7">
          {/* 결제 정보 : 수단에 따라 정보 상이하게 표시 */}
          <p className="font-bold text-sm sm:text-base">결제 수단: {orderInfo.payment.method}</p>
          {orderInfo.payment.method === '무통장 입금' && (
            <>
              <p className="text-sm sm:text-base">입금 계좌: {`${bankInfo} ${getAccountByBank(bankInfo)}`}</p>
              <p className="text-sm sm:text-base">입금자명: {orderInfo.payment.info.split('&')[1]?.trim()}</p>
            </>
          )}

          {orderInfo.payment.method === '간편결제' && <p className="font-bold text-sm sm:text-base">{orderInfo.payment.info} 페이</p>}

          {orderInfo.payment.method === '체크/신용 카드' && (
            <p className="text-sm sm:text-base">카드번호: {orderInfo.payment.info.split('&')[0].trim()}</p>
          )}

          {/* 주문 금액 정보 */}
          <div className="w-full flex flex-row justify-between mt-3">
            <p className="text-secondary label-m">상품금액</p>
            <p className="text-secondary label-m">{orderInfo.cost.products.toLocaleString()}</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="text-secondary label-m">배송비</p>
            <p className="text-secondary label-m">{orderInfo.cost.shippingFees.toLocaleString()}</p>
          </div>
          <div className="w-full flex flex-row justify-between mt-3">
            <p className="font-bold text-base sm:text-lg">주문 금액</p>
            <p className="font-bold text-base sm:text-lg">{orderInfo.cost.total.toLocaleString()}</p>
          </div>
        </div>
      </section>
    </>
  );
}
