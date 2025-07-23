import HistoryCard from '@/app/my/components/HistoryCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';

const historyCardInfo = [
  {
    id: 3,
    status: '입금 확인 중',
    src: '/product_images/nuphy_field75/nuphy_field75_spacegray_detail_06.webp',
    name: 'NUPHY [Magnetic Jade] Field75 HE 자석축 기계식키보드 래피드 트리거 게이밍',
    price: 299000,
    quantity: 1,
    date: '2025/07/22',
  },
  {
    id: 2,
    status: '배송중',
    src: '/product_images/nuphy_field75/nuphy_field75_spacegray_detail_06.webp',
    name: 'NUPHY [Magnetic Jade] Field75 HE 자석축 기계식키보드 래피드 트리거 게이밍',
    price: 299000,
    quantity: 3,
    date: '2025/07/22',
  },
  {
    id: 1,
    status: '배송 완료',
    src: '/product_images/nuphy_kick75/nuphy_kick75_detail_08.webp',
    name: 'NUPHY KICK75 기계식 키보드 로우 하이 듀얼 프로파일 커스텀 키보드',
    price: 1500000,
    quantity: 2,
    date: '2025/07/13',
  },
];

export default function HistoryTab() {
  return (
    <>
      <SubTitle className="sub-contents">구매 내역</SubTitle>
      <div className="bg-white py-3 mt-3">
        {historyCardInfo.map((order, index) => (
          <HistoryCard
            key={index}
            id={order.id}
            status={order.status}
            src={order.src}
            name={order.name}
            price={order.price}
            quantity={order.quantity}
            date={order.date}
          />
        ))}
      </div>
      <Pagination totalPages={3} currentPage={1} />
    </>
  );
}
