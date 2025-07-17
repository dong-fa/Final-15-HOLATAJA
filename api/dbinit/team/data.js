import dayjs from 'dayjs';

function getTime(day = 0, second = 0) {
  return dayjs().add(day, 'days').add(second, 'seconds').format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'admin@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `/files/${clientId}/user-muzi.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '03-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '네오',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '죠르디',
        phone: '01025252525',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
    ],

    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 219000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: 'NUPHY AIR96 V2 기계식 키보드 청축 블루투스 무선 유선 풀배열 슬림형',
        quantity: 300,
        buyQuantity: 10,
        mainImages: [
          {
            path: `files/${clientId}/nuphy_air96_lunagray_detail_01.webp`,
            name: 'nuphy_air96_lunagray_detail_01.webp',
            originalname: 'AIR96',
          },
        ],
        createdAt: '2025.07.10 15:07:54',
        updatedAt: '2025.07.12 01:07:54',
        extra: {
          isNew: false,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 179000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: 'NUPHY AIR60 V2 기계식 키보드 청축 블루투스 무선 유선 미니 텐키리스 슬림형',
        quantity: 300,
        buyQuantity: 10,
        mainImages: [
          {
            path: `files/${clientId}/nuphy_air60_lunagray_detail_01.webp`,
            name: 'nuphy_air60_lunagray_detail_01.webp',
            originalname: 'AIR60',
          },
        ],
        createdAt: '2025.07.10 15:07:54',
        updatedAt: '2025.07.12 01:07:54',
        extra: {
          isNew: false,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 219000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: 'NUPHY Halo V2 기계식 키보드 레몬축 블루투스 무선 유선 한영 각인',
        quantity: 300,
        buyQuantity: 10,
        mainImages: [
          {
            path: `files/${clientId}/nuphy_halo75_detail_01.webp`,
            name: 'nuphy_halo75_detail_01.webp',
            originalname: 'HALO75',
          },
        ],
        createdAt: '2025.07.10 15:07:54',
        updatedAt: '2025.07.12 01:07:54',
        extra: {
          isNew: false,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 159000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: 'NUPHY KICK75 기계식 키보드 로우 하이 듀얼 프로파일 커스텀 키보드',
        quantity: 300,
        buyQuantity: 10,
        mainImages: [
          {
            path: `files/${clientId}/nuphy_kick75_detail_01.webp`,
            name: 'nuphy_kick75_detail_01.webp',
            originalname: 'KICK75',
          },
        ],
        createdAt: '2025.07.10 15:07:54',
        updatedAt: '2025.07.12 01:07:54',
        extra: {
          isNew: false,
        },
      },
    ],

    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 1,
        state: 'OS020',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS020',
            name: 'NUPHY AIR96 V2 기계식 키보드 청축 블루투스 무선 유선 풀배열 슬림형',
            image: {
              path: `files/${clientId}/nuphy_air96_lunagray_detail_01.webp`,
              name: 'nuphy_air96_lunagray_detail_01.webp',
              originalname: 'AIR96',
            },
            quantity: 2,
            price: 219000,
            review_id: 3,
          },
        ],
        cost: {
          products: 219000,
          shippingFees: 3000,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 222000,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
    ],

    // 후기
    review: [
      {
        _id: await nextSeq('review'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: '아이가 좋아해요.',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
    ],

    // 장바구니
    cart: [
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
    ],

    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: 'product',
        target_id: 2,
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
    ],

    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼마만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.png',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 4,
              name: '제이지',
              image: 'user-jayg.webp',
            },
            content: '어디있나 모르겠어요.',
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.png',
            },
            content: '높이 60cm 입니다.',
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
    ],

    // 코드
    code: [
      {
        _id: 'productCategory',
        title: '상품 카테고리',
        codes: [
          {
            sort: 1,
            code: 'RED',
            value: '적축',
            depth: 1,
          },
          {
            sort: 2,
            code: 'BLUE',
            value: '청축',
            depth: 1,
          },
          {
            sort: 3,
            code: 'BROWN',
            value: '갈축',
            depth: 1,
          },
          {
            sort: 4,
            code: 'OTHER',
            value: '기타',
            depth: 1,
          },
        ],
      },
      {
        _id: 'orderState',
        title: '주문 상태',
        codes: [
          {
            sort: 1,
            code: 'OS010',
            value: '주문 완료',
          },
          {
            sort: 2,
            code: 'OS020',
            value: '결제 완료',
          },
          {
            sort: 3,
            code: 'OS030',
            value: '배송 준비중',
          },
          {
            sort: 4,
            code: 'OS035',
            value: '배송중',
          },
          {
            sort: 5,
            code: 'OS040',
            value: '배송 완료',
          },
          {
            sort: 6,
            code: 'OS110',
            value: '반품 요청',
          },
          {
            sort: 7,
            code: 'OS120',
            value: '반품 처리중',
          },
          {
            sort: 8,
            code: 'OS130',
            value: '반품 완료',
          },
          {
            sort: 9,
            code: 'OS210',
            value: '교환 요청',
          },
          {
            sort: 10,
            code: 'OS220',
            value: '교환 처리중',
          },
          {
            sort: 11,
            code: 'OS230',
            value: '교환 완료',
          },
          {
            sort: 12,
            code: 'OS310',
            value: '환불 요청',
          },
          {
            sort: 13,
            code: 'OS320',
            value: '환불 처리중',
          },
          {
            sort: 14,
            code: 'OS330',
            value: '환불 완료',
          },
        ],
      },
    ],

    // 설정
    config: [
      {
        _id: 'shippingFees',
        title: '배송비',
        value: 3000,
      },
      {
        _id: 'freeShippingFees',
        title: '배송비 무료 금액',
        value: 5000000,
      },
    ],
  };
};
