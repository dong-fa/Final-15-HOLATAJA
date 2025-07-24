import HistoryCard from '@/app/my/components/HistoryCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { getOrderStatusLabel } from '@/data/tables/mappingTables';

const historyCardInfo = [
  {
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
    },
    payment: {
      method: '무통장 입금',
      info: '국민은행 & 강승효',
    },
    state: 'OS010',
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
  },
  {
    _id: 14,
    products: [
      {
        _id: 11,
        quantity: 2,
        seller_id: 15,
        name: 'NUPHY Halo75 V2 기계식 키보드 라즈베리축 블루투스 유선 무선 한영 각인',
        image: {
          type: 'detail',
          originalname: 'nuphy_halo75_detail_raspberry.webp',
          name: '_vT5QslYP.webp',
          path: 'files/febc13-final15-emjf/_vT5QslYP.webp',
        },
        price: 498000,
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
    ],
    options: [
      {
        option: '옵시디언 블랙',
      },
    ],
    address: {
      name: '강승효',
      value: '서울시 금천구 가산동 213',
    },
    payment: {
      method: '무통장 입금',
      info: '국민은행 & 강승효',
    },
    state: 'OS020',
    user_id: 21,
    createdAt: '2025.07.23 15:20:09',
    updatedAt: '2025.07.23 15:20:09',
    cost: {
      products: 498000,
      shippingFees: 0,
      discount: {
        products: 0,
        shippingFees: 0,
      },
      total: 498000,
    },
  },
  {
    _id: 13,
    products: [
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
        _id: 11,
        quantity: 2,
        seller_id: 15,
        name: 'NUPHY Halo75 V2 기계식 키보드 라즈베리축 블루투스 유선 무선 한영 각인',
        image: {
          type: 'detail',
          originalname: 'nuphy_halo75_detail_raspberry.webp',
          name: '_vT5QslYP.webp',
          path: 'files/febc13-final15-emjf/_vT5QslYP.webp',
        },
        price: 498000,
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
        _id: 11,
        quantity: 3,
        seller_id: 15,
        name: 'NUPHY Halo75 V2 기계식 키보드 라즈베리축 블루투스 유선 무선 한영 각인',
        image: {
          type: 'detail',
          originalname: 'nuphy_halo75_detail_raspberry.webp',
          name: '_vT5QslYP.webp',
          path: 'files/febc13-final15-emjf/_vT5QslYP.webp',
        },
        price: 747000,
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
    ],
    options: [
      {
        option: '아이오닉 화이트',
      },
      {
        option: '모히토',
      },
      {
        option: '사쿠라 피즈',
      },
    ],
    address: {
      name: '박키보드매니아',
      value: '서울시 강남구 역삼동 345',
    },
    payment: {
      method: '간편결제',
      info: '토스페이',
    },
    state: 'OS035',
    user_id: 21,
    createdAt: '2025.07.23 15:18:37',
    updatedAt: '2025.07.23 15:18:37',
    cost: {
      products: 249000,
      shippingFees: 0,
      discount: {
        products: 0,
        shippingFees: 0,
      },
      total: 249000,
    },
  },
  {
    _id: 12,
    products: [
      {
        _id: 20,
        quantity: 1,
        seller_id: 15,
        name: 'NUPHY AIR75 V2 기계식 키보드 갈축 블루투스 무선 유선 텐키리스 슬림형',
        image: {
          type: 'detail',
          originalname: 'nuphy_air75_basaltblack_detail_brown.webp',
          name: '0emHVTzwm.webp',
          path: 'files/febc13-final15-emjf/0emHVTzwm.webp',
        },
        price: 209000,
        extra: {
          isNew: false,
          category: 'BROWN',
          option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
          description:
            '콤팩트한 사이즈와 디자인은 그대로! 편의성과 성능은 업그레이드 되어 돌아왔습니다. AIR75 V2는 실제 사용량이 가장 많은 대중적인 75% 배열 텐키리스 기계식 키보드입니다. 안정적인 타건감, 디자인 및 성능까지 완벽해진 NUPHY AIR75 V2로 세 마리 토끼를 모두 잡은 데스크테리어를 완성해보세요.',
          'function-tag': '',
          'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
        },
      },
      {
        _id: 20,
        quantity: 2,
        seller_id: 15,
        name: 'NUPHY AIR75 V2 기계식 키보드 갈축 블루투스 무선 유선 텐키리스 슬림형',
        image: {
          type: 'detail',
          originalname: 'nuphy_air75_basaltblack_detail_brown.webp',
          name: '0emHVTzwm.webp',
          path: 'files/febc13-final15-emjf/0emHVTzwm.webp',
        },
        price: 418000,
        extra: {
          isNew: false,
          category: 'BROWN',
          option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
          description:
            '콤팩트한 사이즈와 디자인은 그대로! 편의성과 성능은 업그레이드 되어 돌아왔습니다. AIR75 V2는 실제 사용량이 가장 많은 대중적인 75% 배열 텐키리스 기계식 키보드입니다. 안정적인 타건감, 디자인 및 성능까지 완벽해진 NUPHY AIR75 V2로 세 마리 토끼를 모두 잡은 데스크테리어를 완성해보세요.',
          'function-tag': '',
          'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
        },
      },
    ],
    options: [
      {
        option: '루나 그레이',
      },
      {
        option: '바솔트 블랙',
      },
    ],
    address: {
      name: '박한철',
      value: '서울시 강남구 역삼동 234',
    },
    payment: {
      method: '체크/신용카드 결제',
      info: '0000-1234-5678-0000 & 12/24 & 838 & 22',
    },
    state: 'OS040',
    user_id: 21,
    createdAt: '2025.07.23 15:14:19',
    updatedAt: '2025.07.23 15:14:19',
    cost: {
      products: 209000,
      shippingFees: 0,
      discount: {
        products: 0,
        shippingFees: 0,
      },
      total: 209000,
    },
  },
];

export default function OrderTab() {
  return (
    <>
      <SubTitle className="label-l">구매 내역</SubTitle>
      <div className="bg-white py-3 mt-3">
        {historyCardInfo.map((order, index) => (
          <HistoryCard
            key={index}
            id={order._id}
            status={getOrderStatusLabel(order.state)}
            src={`https://fesp-api.koyeb.app/market/${order.products[0].image.path}`}
            name={order.products[0].name}
            price={order.cost.total}
            quantity={order.products.length}
            date={order.createdAt}
          />
        ))}
      </div>
      <Pagination totalPages={3} currentPage={1} />
    </>
  );
}
