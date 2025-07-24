import OrderedCard from '@/components/OrderdCard';
import { SubTitle, Title } from '@/components/Typography';
import { getAccountByBank, getOrderStatusLabel } from '@/data/tables/mappingTables';
import Link from 'next/link';

const orderInfoProps = {
  _id: 15,
  products: [
    {
      _id: 8,
      quantity: 2,
      seller_id: 15,
      name: 'NUPHY AIR96 V2 기계식 키보드 갈축 블루투스 무선 유선 풀배열 슬림형',
      image: {
        type: 'detail',
        originalname: 'nuphy_air96_lunagray_detail_brown.webp',
        name: '5Czi-4p72.webp',
        path: 'files/febc13-final15-emjf/5Czi-4p72.webp',
      },
      price: 438000,
      extra: {
        isNew: false,
        category: 'BROWN',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        summary_description: '컴팩트한 풀배열 무선 기계식 키보드',
        full_description:
          '우측 넘버 패드를 자주 사용하시는 분들을 위한 100키 구성 풀배열 기계식 키보드 AIR96 V2! QMK&VIA 지원 및 고성능 칩셋과 대용량 배터리가 탑재되어 있습니다. 완벽한 성능과 예쁜 디자인, 안정적인 타건감까지 느낄 수 있는 NUPHY AIR96 V2를 만나보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
    {
      _id: 11,
      quantity: 1,
      seller_id: 15,
      name: 'NUPHY Halo75 V2 기계식 키보드 라즈베리축 블루투스 유선 무선 한영 각인',
      image: {
        type: 'detail',
        originalname: 'nuphy_halo75_detail_raspberry.webp',
        name: '_vT5QslYP.webp',
        path: 'files/febc13-final15-emjf/_vT5QslYP.webp',
      },
      price: 249000,
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['아이오닉 화이트', '옵시디언 블랙', '사쿠라 피즈', '블루 라군', '모히토'],
        description:
          '새롭게 돌아온 75% 배열 83키 구성 텐키리스 기계식 키보드 Halo75 V2를 소개합니다. 업그레이드 된 성능과 감각적인 디자인, 더욱 영롱해진 Halo 라이트와 백라이트 효과! 독특한 감성을 갖고 있는 NUPHY Halo75 V2로 즐거운 타이핑 경험을 느껴보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
    {
      _id: 22,
      quantity: 1,
      seller_id: 15,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      image: {
        type: 'detail',
        originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
        name: '63UkNYUwN.webp',
        path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
      },
      price: 269000,
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['다크매터'],
        description:
          '프리미엄 풀 알루미늄 프레임, 자석축 기계식 키보드 BH65는 자체 개발 N.U.A 차세대 자석축 알고리즘으로 키 입력 습관에 따라 동적으로 키를 보정합니다. 8KHz 폴링레이트, 작동 지점 조절, 래피드 트리거, 하이퍼 탭 등 다양한 기능을 지원하는 65% 배열 BH65로 새로운 플레이를 즐겨보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  ],
  options: [
    {
      option: '바솔트 블랙',
    },
    {
      option: '블루 라군',
    },
    {
      option: '다크매터',
    },
  ],
  address: {
    name: '강승효',
    value: '서울시 금천구 가산동 213',
    phone: '010-1111-2222',
  },
  payment: {
    method: '무통장 입금',
    info: '국민은행 & 강승효',
  },
  state: 'OS020',
  user_id: 21,
  createdAt: '2025.07.23 15:24:40',
  updatedAt: '2025.07.23 15:24:40',
  cost: {
    products: 956000,
    shippingFees: 0,
    discount: {
      products: 0,
      shippingFees: 0,
    },
    total: 956000,
  },
};

export default function OrderInfo() {
  const bankInfo = orderInfoProps.payment.info.split('&')[0].trim();

  return (
    <>
      <nav className="text-sm text-gray-500 mb-2 flex flex-row">
        <Link href={`/my`} className="text-secondary hover:underline">
          Orders /
        </Link>
        <p className="mx-1 text-text">Order Details</p>
      </nav>
      <Title className="title">구매 내역 상세</Title>
      <div className="flex flex-row justify-between my-2">
        <div>
          <p className="text-secondary label-s">
            Order #{orderInfoProps._id} · 주문일시: {orderInfoProps.createdAt}
          </p>
        </div>
        <p className="label-s font-bold">{getOrderStatusLabel(orderInfoProps.state)}</p>
      </div>

      <SubTitle className="label-l">주문 상품</SubTitle>
      <section className="bg-white">
        {orderInfoProps.products.map((product, index) => (
          <OrderedCard
            key={index}
            src={`https://fesp-api.koyeb.app/market/${product.image.path}`}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            option={orderInfoProps.options[index].option}
          />
        ))}
      </section>

      <SubTitle className="label-l mt-2">배송지</SubTitle>
      <section className="bg-white">
        <div className="flex flex-col items-start px-4 py-7">
          <p className="font-bold text-sm sm:text-base">{orderInfoProps.address.name}</p>
          <p className="text-sm sm:text-base">{orderInfoProps.address.phone}</p>
          <p className="text-sm sm:text-base">{orderInfoProps.address.value}</p>
        </div>
      </section>

      <SubTitle className="label-l mt-2">결제 정보</SubTitle>
      <section className="bg-white">
        <div className="flex flex-col items-start px-4 py-7">
          {/* 결제 정보 : 수단에 따라 정보 상이하게 표시 */}
          <p className="font-bold text-sm sm:text-base">
            결제 수단: {orderInfoProps.payment.method} / 입금자명 {orderInfoProps.payment.info.split('&')[1]?.trim()}
          </p>
          {orderInfoProps.payment.method === '무통장 입금' && (
            <>
              <p className="font-bold text-sm sm:text-base">입금 계좌: {`${bankInfo} ${getAccountByBank(bankInfo)}`}</p>
            </>
          )}

          {orderInfoProps.payment.method === '간편결제' && <p className="font-bold text-sm sm:text-base">{orderInfoProps.payment.info}</p>}

          {orderInfoProps.payment.method === '체크/신용카드 결제' && (
            <p className="font-bold text-sm sm:text-base">{orderInfoProps.payment.info.split('&')[0].trim()}</p>
          )}

          {/* 주문 금액 정보 */}
          <div className="w-full flex flex-row justify-between mt-3">
            <p className="text-secondary label-m">상품금액</p>
            <p className="text-secondary label-m">{orderInfoProps.cost.products.toLocaleString()}</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="text-secondary label-m">배송비</p>
            <p className="text-secondary label-m">{orderInfoProps.cost.shippingFees.toLocaleString()}</p>
          </div>
          <div className="w-full flex flex-row justify-between mt-3">
            <p className="font-bold text-base sm:text-lg">주문 금액</p>
            <p className="font-bold text-base sm:text-lg">{orderInfoProps.cost.total.toLocaleString()}</p>
          </div>
        </div>
      </section>
    </>
  );
}
