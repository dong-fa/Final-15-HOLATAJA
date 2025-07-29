'use client';

import BookmarkCard from '@/app/my/components/BookmarkCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { useState } from 'react';

const res = [
  {
    _id: 7,
    createdAt: '2025.07.25 11:41:30',
    product: {
      _id: 14,
      name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
      price: 179000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_01.webp',
          name: '7xsPlo3aY.webp',
          path: 'files/febc13-final15-emjf/7xsPlo3aY.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_02.webp',
          name: 'KsUAcnK3h.webp',
          path: 'files/febc13-final15-emjf/KsUAcnK3h.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_03.webp',
          name: '0QLkliO6N2.webp',
          path: 'files/febc13-final15-emjf/0QLkliO6N2.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_04.webp',
          name: '1EIMHJH6mC.webp',
          path: 'files/febc13-final15-emjf/1EIMHJH6mC.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_05.webp',
          name: 'Hm_8vIaDG.webp',
          path: 'files/febc13-final15-emjf/Hm_8vIaDG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_06.webp',
          name: 'MnNoXI_HPn.webp',
          path: 'files/febc13-final15-emjf/MnNoXI_HPn.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_07.webp',
          name: 'Epc7pUeabc.webp',
          path: 'files/febc13-final15-emjf/Epc7pUeabc.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_08.webp',
          name: 'rleBZy7rQI.webp',
          path: 'files/febc13-final15-emjf/rleBZy7rQI.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_01.webp',
          name: 'ZXrXlfryi.webp',
          path: 'files/febc13-final15-emjf/ZXrXlfryi.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_02.webp',
          name: 'GVyknGBi8.webp',
          path: 'files/febc13-final15-emjf/GVyknGBi8.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_03.webp',
          name: 'yKchhDuCbR.webp',
          path: 'files/febc13-final15-emjf/yKchhDuCbR.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_04.webp',
          name: 'IpT5MfPtz.webp',
          path: 'files/febc13-final15-emjf/IpT5MfPtz.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_05.webp',
          name: 'kOG2qTOeD.webp',
          path: 'files/febc13-final15-emjf/kOG2qTOeD.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['레트로 그레이'],
        description:
          '하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 8,
    createdAt: '2025.07.25 11:41:35',
    product: {
      _id: 17,
      name: 'NUPHY AIR60 V2 기계식 키보드 적축 블루투스 무선 유선 미니 텐키리스 슬림형',
      price: 199000,
      quantity: 100,
      buyQuantity: 0,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_red.webp',
          name: 'Y0p7_zgeu.webp',
          path: 'files/febc13-final15-emjf/Y0p7_zgeu.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_01.webp',
          name: 'ghiTZ8pJ5.webp',
          path: 'files/febc13-final15-emjf/ghiTZ8pJ5.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_02.webp',
          name: '9Spyfx2msd.webp',
          path: 'files/febc13-final15-emjf/9Spyfx2msd.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_03.webp',
          name: 'B4olSH1ib.webp',
          path: 'files/febc13-final15-emjf/B4olSH1ib.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_04.webp',
          name: 'mINxJDHdY7.webp',
          path: 'files/febc13-final15-emjf/mINxJDHdY7.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_01.webp',
          name: 'qOcPemyS8E.webp',
          path: 'files/febc13-final15-emjf/qOcPemyS8E.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_02.webp',
          name: 'KBwRtUh1K.webp',
          path: 'files/febc13-final15-emjf/KBwRtUh1K.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_03.webp',
          name: '5_O16Z6gKc.webp',
          path: 'files/febc13-final15-emjf/5_O16Z6gKc.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_04.webp',
          name: 'njfOisX0_3.webp',
          path: 'files/febc13-final15-emjf/njfOisX0_3.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_05.webp',
          name: 'ZFifFyfIi.webp',
          path: 'files/febc13-final15-emjf/ZFifFyfIi.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'RED',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        description:
          '휴대성 높은 64키 텐키리스 기계식 키보드! 콤팩트한 디자인은 그대로, 편의성과 성능은 업그레이드 된 AIR60 V2는 미니멀한 사이즈로 데스크 공간을 효율적으로 사용할 수 있습니다. 디자인 및 성능, 안정적인 타건감까지 모두 갖춘 NUPHY AIR60 V2로 데스크테리어를 완성해보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 9,
    createdAt: '2025.07.25 11:41:40',
    product: {
      _id: 22,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      price: 269000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
          name: '63UkNYUwN.webp',
          path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_01.webp',
          name: 'uVx5NTb5c.webp',
          path: 'files/febc13-final15-emjf/uVx5NTb5c.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_02.webp',
          name: 'ZPhcl0zIdL.webp',
          path: 'files/febc13-final15-emjf/ZPhcl0zIdL.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_03.webp',
          name: 'k1magnNuiq.webp',
          path: 'files/febc13-final15-emjf/k1magnNuiq.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_04.webp',
          name: 'Ou6Jfa_YAG.webp',
          path: 'files/febc13-final15-emjf/Ou6Jfa_YAG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_05.webp',
          name: 'mQjs_3kL3L.webp',
          path: 'files/febc13-final15-emjf/mQjs_3kL3L.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_06.webp',
          name: 'I6LcXaqvh.webp',
          path: 'files/febc13-final15-emjf/I6LcXaqvh.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_01.webp',
          name: 'YiV9KszE_U.webp',
          path: 'files/febc13-final15-emjf/YiV9KszE_U.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_02.webp',
          name: 'ZVfdzb9N4.webp',
          path: 'files/febc13-final15-emjf/ZVfdzb9N4.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_info_01.webp',
          name: '9mkUrULzOt.webp',
          path: 'files/febc13-final15-emjf/9mkUrULzOt.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_03.webp',
          name: 'moK2gg33o.webp',
          path: 'files/febc13-final15-emjf/moK2gg33o.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_04.webp',
          name: 'VsqcvI6dR.webp',
          path: 'files/febc13-final15-emjf/VsqcvI6dR.webp',
        },
      ],
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
  },
  {
    _id: 7,
    createdAt: '2025.07.25 11:41:30',
    product: {
      _id: 14,
      name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
      price: 179000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_01.webp',
          name: '7xsPlo3aY.webp',
          path: 'files/febc13-final15-emjf/7xsPlo3aY.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_02.webp',
          name: 'KsUAcnK3h.webp',
          path: 'files/febc13-final15-emjf/KsUAcnK3h.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_03.webp',
          name: '0QLkliO6N2.webp',
          path: 'files/febc13-final15-emjf/0QLkliO6N2.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_04.webp',
          name: '1EIMHJH6mC.webp',
          path: 'files/febc13-final15-emjf/1EIMHJH6mC.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_05.webp',
          name: 'Hm_8vIaDG.webp',
          path: 'files/febc13-final15-emjf/Hm_8vIaDG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_06.webp',
          name: 'MnNoXI_HPn.webp',
          path: 'files/febc13-final15-emjf/MnNoXI_HPn.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_07.webp',
          name: 'Epc7pUeabc.webp',
          path: 'files/febc13-final15-emjf/Epc7pUeabc.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_08.webp',
          name: 'rleBZy7rQI.webp',
          path: 'files/febc13-final15-emjf/rleBZy7rQI.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_01.webp',
          name: 'ZXrXlfryi.webp',
          path: 'files/febc13-final15-emjf/ZXrXlfryi.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_02.webp',
          name: 'GVyknGBi8.webp',
          path: 'files/febc13-final15-emjf/GVyknGBi8.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_03.webp',
          name: 'yKchhDuCbR.webp',
          path: 'files/febc13-final15-emjf/yKchhDuCbR.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_04.webp',
          name: 'IpT5MfPtz.webp',
          path: 'files/febc13-final15-emjf/IpT5MfPtz.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_05.webp',
          name: 'kOG2qTOeD.webp',
          path: 'files/febc13-final15-emjf/kOG2qTOeD.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['레트로 그레이'],
        description:
          '하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 8,
    createdAt: '2025.07.25 11:41:35',
    product: {
      _id: 17,
      name: 'NUPHY AIR60 V2 기계식 키보드 적축 블루투스 무선 유선 미니 텐키리스 슬림형',
      price: 199000,
      quantity: 100,
      buyQuantity: 0,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_red.webp',
          name: 'Y0p7_zgeu.webp',
          path: 'files/febc13-final15-emjf/Y0p7_zgeu.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_01.webp',
          name: 'ghiTZ8pJ5.webp',
          path: 'files/febc13-final15-emjf/ghiTZ8pJ5.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_02.webp',
          name: '9Spyfx2msd.webp',
          path: 'files/febc13-final15-emjf/9Spyfx2msd.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_03.webp',
          name: 'B4olSH1ib.webp',
          path: 'files/febc13-final15-emjf/B4olSH1ib.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_04.webp',
          name: 'mINxJDHdY7.webp',
          path: 'files/febc13-final15-emjf/mINxJDHdY7.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_01.webp',
          name: 'qOcPemyS8E.webp',
          path: 'files/febc13-final15-emjf/qOcPemyS8E.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_02.webp',
          name: 'KBwRtUh1K.webp',
          path: 'files/febc13-final15-emjf/KBwRtUh1K.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_03.webp',
          name: '5_O16Z6gKc.webp',
          path: 'files/febc13-final15-emjf/5_O16Z6gKc.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_04.webp',
          name: 'njfOisX0_3.webp',
          path: 'files/febc13-final15-emjf/njfOisX0_3.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_05.webp',
          name: 'ZFifFyfIi.webp',
          path: 'files/febc13-final15-emjf/ZFifFyfIi.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'RED',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        description:
          '휴대성 높은 64키 텐키리스 기계식 키보드! 콤팩트한 디자인은 그대로, 편의성과 성능은 업그레이드 된 AIR60 V2는 미니멀한 사이즈로 데스크 공간을 효율적으로 사용할 수 있습니다. 디자인 및 성능, 안정적인 타건감까지 모두 갖춘 NUPHY AIR60 V2로 데스크테리어를 완성해보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 9,
    createdAt: '2025.07.25 11:41:40',
    product: {
      _id: 22,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      price: 269000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
          name: '63UkNYUwN.webp',
          path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_01.webp',
          name: 'uVx5NTb5c.webp',
          path: 'files/febc13-final15-emjf/uVx5NTb5c.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_02.webp',
          name: 'ZPhcl0zIdL.webp',
          path: 'files/febc13-final15-emjf/ZPhcl0zIdL.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_03.webp',
          name: 'k1magnNuiq.webp',
          path: 'files/febc13-final15-emjf/k1magnNuiq.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_04.webp',
          name: 'Ou6Jfa_YAG.webp',
          path: 'files/febc13-final15-emjf/Ou6Jfa_YAG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_05.webp',
          name: 'mQjs_3kL3L.webp',
          path: 'files/febc13-final15-emjf/mQjs_3kL3L.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_06.webp',
          name: 'I6LcXaqvh.webp',
          path: 'files/febc13-final15-emjf/I6LcXaqvh.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_01.webp',
          name: 'YiV9KszE_U.webp',
          path: 'files/febc13-final15-emjf/YiV9KszE_U.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_02.webp',
          name: 'ZVfdzb9N4.webp',
          path: 'files/febc13-final15-emjf/ZVfdzb9N4.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_info_01.webp',
          name: '9mkUrULzOt.webp',
          path: 'files/febc13-final15-emjf/9mkUrULzOt.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_03.webp',
          name: 'moK2gg33o.webp',
          path: 'files/febc13-final15-emjf/moK2gg33o.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_04.webp',
          name: 'VsqcvI6dR.webp',
          path: 'files/febc13-final15-emjf/VsqcvI6dR.webp',
        },
      ],
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
  },
  {
    _id: 7,
    createdAt: '2025.07.25 11:41:30',
    product: {
      _id: 14,
      name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
      price: 179000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_01.webp',
          name: '7xsPlo3aY.webp',
          path: 'files/febc13-final15-emjf/7xsPlo3aY.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_02.webp',
          name: 'KsUAcnK3h.webp',
          path: 'files/febc13-final15-emjf/KsUAcnK3h.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_03.webp',
          name: '0QLkliO6N2.webp',
          path: 'files/febc13-final15-emjf/0QLkliO6N2.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_04.webp',
          name: '1EIMHJH6mC.webp',
          path: 'files/febc13-final15-emjf/1EIMHJH6mC.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_05.webp',
          name: 'Hm_8vIaDG.webp',
          path: 'files/febc13-final15-emjf/Hm_8vIaDG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_06.webp',
          name: 'MnNoXI_HPn.webp',
          path: 'files/febc13-final15-emjf/MnNoXI_HPn.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_07.webp',
          name: 'Epc7pUeabc.webp',
          path: 'files/febc13-final15-emjf/Epc7pUeabc.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_08.webp',
          name: 'rleBZy7rQI.webp',
          path: 'files/febc13-final15-emjf/rleBZy7rQI.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_01.webp',
          name: 'ZXrXlfryi.webp',
          path: 'files/febc13-final15-emjf/ZXrXlfryi.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_02.webp',
          name: 'GVyknGBi8.webp',
          path: 'files/febc13-final15-emjf/GVyknGBi8.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_03.webp',
          name: 'yKchhDuCbR.webp',
          path: 'files/febc13-final15-emjf/yKchhDuCbR.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_04.webp',
          name: 'IpT5MfPtz.webp',
          path: 'files/febc13-final15-emjf/IpT5MfPtz.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_05.webp',
          name: 'kOG2qTOeD.webp',
          path: 'files/febc13-final15-emjf/kOG2qTOeD.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['레트로 그레이'],
        description:
          '하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 8,
    createdAt: '2025.07.25 11:41:35',
    product: {
      _id: 17,
      name: 'NUPHY AIR60 V2 기계식 키보드 적축 블루투스 무선 유선 미니 텐키리스 슬림형',
      price: 199000,
      quantity: 100,
      buyQuantity: 0,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_red.webp',
          name: 'Y0p7_zgeu.webp',
          path: 'files/febc13-final15-emjf/Y0p7_zgeu.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_01.webp',
          name: 'ghiTZ8pJ5.webp',
          path: 'files/febc13-final15-emjf/ghiTZ8pJ5.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_02.webp',
          name: '9Spyfx2msd.webp',
          path: 'files/febc13-final15-emjf/9Spyfx2msd.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_03.webp',
          name: 'B4olSH1ib.webp',
          path: 'files/febc13-final15-emjf/B4olSH1ib.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_04.webp',
          name: 'mINxJDHdY7.webp',
          path: 'files/febc13-final15-emjf/mINxJDHdY7.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_01.webp',
          name: 'qOcPemyS8E.webp',
          path: 'files/febc13-final15-emjf/qOcPemyS8E.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_02.webp',
          name: 'KBwRtUh1K.webp',
          path: 'files/febc13-final15-emjf/KBwRtUh1K.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_03.webp',
          name: '5_O16Z6gKc.webp',
          path: 'files/febc13-final15-emjf/5_O16Z6gKc.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_04.webp',
          name: 'njfOisX0_3.webp',
          path: 'files/febc13-final15-emjf/njfOisX0_3.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_05.webp',
          name: 'ZFifFyfIi.webp',
          path: 'files/febc13-final15-emjf/ZFifFyfIi.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'RED',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        description:
          '휴대성 높은 64키 텐키리스 기계식 키보드! 콤팩트한 디자인은 그대로, 편의성과 성능은 업그레이드 된 AIR60 V2는 미니멀한 사이즈로 데스크 공간을 효율적으로 사용할 수 있습니다. 디자인 및 성능, 안정적인 타건감까지 모두 갖춘 NUPHY AIR60 V2로 데스크테리어를 완성해보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 9,
    createdAt: '2025.07.25 11:41:40',
    product: {
      _id: 22,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      price: 269000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
          name: '63UkNYUwN.webp',
          path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_01.webp',
          name: 'uVx5NTb5c.webp',
          path: 'files/febc13-final15-emjf/uVx5NTb5c.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_02.webp',
          name: 'ZPhcl0zIdL.webp',
          path: 'files/febc13-final15-emjf/ZPhcl0zIdL.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_03.webp',
          name: 'k1magnNuiq.webp',
          path: 'files/febc13-final15-emjf/k1magnNuiq.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_04.webp',
          name: 'Ou6Jfa_YAG.webp',
          path: 'files/febc13-final15-emjf/Ou6Jfa_YAG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_05.webp',
          name: 'mQjs_3kL3L.webp',
          path: 'files/febc13-final15-emjf/mQjs_3kL3L.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_06.webp',
          name: 'I6LcXaqvh.webp',
          path: 'files/febc13-final15-emjf/I6LcXaqvh.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_01.webp',
          name: 'YiV9KszE_U.webp',
          path: 'files/febc13-final15-emjf/YiV9KszE_U.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_02.webp',
          name: 'ZVfdzb9N4.webp',
          path: 'files/febc13-final15-emjf/ZVfdzb9N4.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_info_01.webp',
          name: '9mkUrULzOt.webp',
          path: 'files/febc13-final15-emjf/9mkUrULzOt.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_03.webp',
          name: 'moK2gg33o.webp',
          path: 'files/febc13-final15-emjf/moK2gg33o.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_04.webp',
          name: 'VsqcvI6dR.webp',
          path: 'files/febc13-final15-emjf/VsqcvI6dR.webp',
        },
      ],
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
  },
  {
    _id: 7,
    createdAt: '2025.07.25 11:41:30',
    product: {
      _id: 14,
      name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
      price: 179000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_01.webp',
          name: '7xsPlo3aY.webp',
          path: 'files/febc13-final15-emjf/7xsPlo3aY.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_02.webp',
          name: 'KsUAcnK3h.webp',
          path: 'files/febc13-final15-emjf/KsUAcnK3h.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_03.webp',
          name: '0QLkliO6N2.webp',
          path: 'files/febc13-final15-emjf/0QLkliO6N2.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_04.webp',
          name: '1EIMHJH6mC.webp',
          path: 'files/febc13-final15-emjf/1EIMHJH6mC.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_05.webp',
          name: 'Hm_8vIaDG.webp',
          path: 'files/febc13-final15-emjf/Hm_8vIaDG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_06.webp',
          name: 'MnNoXI_HPn.webp',
          path: 'files/febc13-final15-emjf/MnNoXI_HPn.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_07.webp',
          name: 'Epc7pUeabc.webp',
          path: 'files/febc13-final15-emjf/Epc7pUeabc.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_08.webp',
          name: 'rleBZy7rQI.webp',
          path: 'files/febc13-final15-emjf/rleBZy7rQI.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_01.webp',
          name: 'ZXrXlfryi.webp',
          path: 'files/febc13-final15-emjf/ZXrXlfryi.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_02.webp',
          name: 'GVyknGBi8.webp',
          path: 'files/febc13-final15-emjf/GVyknGBi8.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_03.webp',
          name: 'yKchhDuCbR.webp',
          path: 'files/febc13-final15-emjf/yKchhDuCbR.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_04.webp',
          name: 'IpT5MfPtz.webp',
          path: 'files/febc13-final15-emjf/IpT5MfPtz.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_05.webp',
          name: 'kOG2qTOeD.webp',
          path: 'files/febc13-final15-emjf/kOG2qTOeD.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['레트로 그레이'],
        description:
          '하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 8,
    createdAt: '2025.07.25 11:41:35',
    product: {
      _id: 17,
      name: 'NUPHY AIR60 V2 기계식 키보드 적축 블루투스 무선 유선 미니 텐키리스 슬림형',
      price: 199000,
      quantity: 100,
      buyQuantity: 0,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_red.webp',
          name: 'Y0p7_zgeu.webp',
          path: 'files/febc13-final15-emjf/Y0p7_zgeu.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_01.webp',
          name: 'ghiTZ8pJ5.webp',
          path: 'files/febc13-final15-emjf/ghiTZ8pJ5.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_02.webp',
          name: '9Spyfx2msd.webp',
          path: 'files/febc13-final15-emjf/9Spyfx2msd.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_03.webp',
          name: 'B4olSH1ib.webp',
          path: 'files/febc13-final15-emjf/B4olSH1ib.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_04.webp',
          name: 'mINxJDHdY7.webp',
          path: 'files/febc13-final15-emjf/mINxJDHdY7.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_01.webp',
          name: 'qOcPemyS8E.webp',
          path: 'files/febc13-final15-emjf/qOcPemyS8E.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_02.webp',
          name: 'KBwRtUh1K.webp',
          path: 'files/febc13-final15-emjf/KBwRtUh1K.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_03.webp',
          name: '5_O16Z6gKc.webp',
          path: 'files/febc13-final15-emjf/5_O16Z6gKc.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_04.webp',
          name: 'njfOisX0_3.webp',
          path: 'files/febc13-final15-emjf/njfOisX0_3.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_05.webp',
          name: 'ZFifFyfIi.webp',
          path: 'files/febc13-final15-emjf/ZFifFyfIi.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'RED',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        description:
          '휴대성 높은 64키 텐키리스 기계식 키보드! 콤팩트한 디자인은 그대로, 편의성과 성능은 업그레이드 된 AIR60 V2는 미니멀한 사이즈로 데스크 공간을 효율적으로 사용할 수 있습니다. 디자인 및 성능, 안정적인 타건감까지 모두 갖춘 NUPHY AIR60 V2로 데스크테리어를 완성해보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 9,
    createdAt: '2025.07.25 11:41:40',
    product: {
      _id: 22,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      price: 269000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
          name: '63UkNYUwN.webp',
          path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_01.webp',
          name: 'uVx5NTb5c.webp',
          path: 'files/febc13-final15-emjf/uVx5NTb5c.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_02.webp',
          name: 'ZPhcl0zIdL.webp',
          path: 'files/febc13-final15-emjf/ZPhcl0zIdL.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_03.webp',
          name: 'k1magnNuiq.webp',
          path: 'files/febc13-final15-emjf/k1magnNuiq.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_04.webp',
          name: 'Ou6Jfa_YAG.webp',
          path: 'files/febc13-final15-emjf/Ou6Jfa_YAG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_05.webp',
          name: 'mQjs_3kL3L.webp',
          path: 'files/febc13-final15-emjf/mQjs_3kL3L.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_06.webp',
          name: 'I6LcXaqvh.webp',
          path: 'files/febc13-final15-emjf/I6LcXaqvh.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_01.webp',
          name: 'YiV9KszE_U.webp',
          path: 'files/febc13-final15-emjf/YiV9KszE_U.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_02.webp',
          name: 'ZVfdzb9N4.webp',
          path: 'files/febc13-final15-emjf/ZVfdzb9N4.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_info_01.webp',
          name: '9mkUrULzOt.webp',
          path: 'files/febc13-final15-emjf/9mkUrULzOt.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_03.webp',
          name: 'moK2gg33o.webp',
          path: 'files/febc13-final15-emjf/moK2gg33o.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_04.webp',
          name: 'VsqcvI6dR.webp',
          path: 'files/febc13-final15-emjf/VsqcvI6dR.webp',
        },
      ],
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
  },
  {
    _id: 7,
    createdAt: '2025.07.25 11:41:30',
    product: {
      _id: 14,
      name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
      price: 179000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_01.webp',
          name: '7xsPlo3aY.webp',
          path: 'files/febc13-final15-emjf/7xsPlo3aY.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_02.webp',
          name: 'KsUAcnK3h.webp',
          path: 'files/febc13-final15-emjf/KsUAcnK3h.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_03.webp',
          name: '0QLkliO6N2.webp',
          path: 'files/febc13-final15-emjf/0QLkliO6N2.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_04.webp',
          name: '1EIMHJH6mC.webp',
          path: 'files/febc13-final15-emjf/1EIMHJH6mC.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_05.webp',
          name: 'Hm_8vIaDG.webp',
          path: 'files/febc13-final15-emjf/Hm_8vIaDG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_06.webp',
          name: 'MnNoXI_HPn.webp',
          path: 'files/febc13-final15-emjf/MnNoXI_HPn.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_07.webp',
          name: 'Epc7pUeabc.webp',
          path: 'files/febc13-final15-emjf/Epc7pUeabc.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_kick75_detail_08.webp',
          name: 'rleBZy7rQI.webp',
          path: 'files/febc13-final15-emjf/rleBZy7rQI.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_01.webp',
          name: 'ZXrXlfryi.webp',
          path: 'files/febc13-final15-emjf/ZXrXlfryi.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_02.webp',
          name: 'GVyknGBi8.webp',
          path: 'files/febc13-final15-emjf/GVyknGBi8.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_03.webp',
          name: 'yKchhDuCbR.webp',
          path: 'files/febc13-final15-emjf/yKchhDuCbR.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_04.webp',
          name: 'IpT5MfPtz.webp',
          path: 'files/febc13-final15-emjf/IpT5MfPtz.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_kick75_info_05.webp',
          name: 'kOG2qTOeD.webp',
          path: 'files/febc13-final15-emjf/kOG2qTOeD.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'OTHER',
        option: ['레트로 그레이'],
        description:
          '하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 8,
    createdAt: '2025.07.25 11:41:35',
    product: {
      _id: 17,
      name: 'NUPHY AIR60 V2 기계식 키보드 적축 블루투스 무선 유선 미니 텐키리스 슬림형',
      price: 199000,
      quantity: 100,
      buyQuantity: 0,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_red.webp',
          name: 'Y0p7_zgeu.webp',
          path: 'files/febc13-final15-emjf/Y0p7_zgeu.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_01.webp',
          name: 'ghiTZ8pJ5.webp',
          path: 'files/febc13-final15-emjf/ghiTZ8pJ5.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_02.webp',
          name: '9Spyfx2msd.webp',
          path: 'files/febc13-final15-emjf/9Spyfx2msd.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_03.webp',
          name: 'B4olSH1ib.webp',
          path: 'files/febc13-final15-emjf/B4olSH1ib.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_air60_lunagray_detail_04.webp',
          name: 'mINxJDHdY7.webp',
          path: 'files/febc13-final15-emjf/mINxJDHdY7.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_01.webp',
          name: 'qOcPemyS8E.webp',
          path: 'files/febc13-final15-emjf/qOcPemyS8E.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_02.webp',
          name: 'KBwRtUh1K.webp',
          path: 'files/febc13-final15-emjf/KBwRtUh1K.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_03.webp',
          name: '5_O16Z6gKc.webp',
          path: 'files/febc13-final15-emjf/5_O16Z6gKc.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_04.webp',
          name: 'njfOisX0_3.webp',
          path: 'files/febc13-final15-emjf/njfOisX0_3.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_air60_lunagray_info_05.webp',
          name: 'ZFifFyfIi.webp',
          path: 'files/febc13-final15-emjf/ZFifFyfIi.webp',
        },
      ],
      extra: {
        isNew: false,
        category: 'RED',
        option: ['루나 그레이', '바솔트 블랙', '아이오닉 화이트'],
        description:
          '휴대성 높은 64키 텐키리스 기계식 키보드! 콤팩트한 디자인은 그대로, 편의성과 성능은 업그레이드 된 AIR60 V2는 미니멀한 사이즈로 데스크 공간을 효율적으로 사용할 수 있습니다. 디자인 및 성능, 안정적인 타건감까지 모두 갖춘 NUPHY AIR60 V2로 데스크테리어를 완성해보세요.',
        'function-tag': '',
        'soundfile-path': 'files/febc13-final15-emjf/_YzMqZjVu.m4a',
      },
    },
  },
  {
    _id: 9,
    createdAt: '2025.07.25 11:41:40',
    product: {
      _id: 22,
      name: 'NUPHY [Jade Gaming] BH65 기계식키보드 래피드 트리거 자석축 게이밍 풀 알루미늄 다크매터, 마그네틱축',
      price: 269000,
      quantity: 100,
      buyQuantity: 2,
      mainImages: [
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_detail_01.webp',
          name: '63UkNYUwN.webp',
          path: 'files/febc13-final15-emjf/63UkNYUwN.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_01.webp',
          name: 'uVx5NTb5c.webp',
          path: 'files/febc13-final15-emjf/uVx5NTb5c.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_02.webp',
          name: 'ZPhcl0zIdL.webp',
          path: 'files/febc13-final15-emjf/ZPhcl0zIdL.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_03.webp',
          name: 'k1magnNuiq.webp',
          path: 'files/febc13-final15-emjf/k1magnNuiq.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_04.webp',
          name: 'Ou6Jfa_YAG.webp',
          path: 'files/febc13-final15-emjf/Ou6Jfa_YAG.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_05.webp',
          name: 'mQjs_3kL3L.webp',
          path: 'files/febc13-final15-emjf/mQjs_3kL3L.webp',
        },
        {
          type: 'detail',
          originalname: 'nuphy_bh65_darkmatter_detail_06.webp',
          name: 'I6LcXaqvh.webp',
          path: 'files/febc13-final15-emjf/I6LcXaqvh.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_01.webp',
          name: 'YiV9KszE_U.webp',
          path: 'files/febc13-final15-emjf/YiV9KszE_U.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_02.webp',
          name: 'ZVfdzb9N4.webp',
          path: 'files/febc13-final15-emjf/ZVfdzb9N4.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_JadeGaming_info_01.webp',
          name: '9mkUrULzOt.webp',
          path: 'files/febc13-final15-emjf/9mkUrULzOt.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_03.webp',
          name: 'moK2gg33o.webp',
          path: 'files/febc13-final15-emjf/moK2gg33o.webp',
        },
        {
          type: 'info',
          originalname: 'nuphy_bh65_darkmatter_info_04.webp',
          name: 'VsqcvI6dR.webp',
          path: 'files/febc13-final15-emjf/VsqcvI6dR.webp',
        },
      ],
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
  },
];

export default function BookmarkTab() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //Pagination
  const [page, setPage] = useState(1);
  const limit = 4;
  const totalPages = Math.ceil(res.length / limit);
  const pagedBookmarkList = res.slice((page - 1) * limit, page * limit);

  return (
    <>
      <SubTitle className="label-l">찜 목록</SubTitle>
      <div className="bg-white py-3 mt-3">
        {pagedBookmarkList.map((item, index) => (
          <BookmarkCard
            key={index}
            id={item.product._id}
            src={`${API_URL}/${item.product.mainImages[0].path}`}
            name={item.product.name}
            price={item.product.price}
          />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
