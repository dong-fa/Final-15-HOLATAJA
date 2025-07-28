import HistoryCard from '@/app/my/components/HistoryCard';
import { SubTitle } from '@/components/Typography';
import { getOrderList } from '@/data/functions/order';
import { getOrderStatusLabel } from '@/data/tables/mappingTables';
import { OrderItem } from '@/types/order';

export default async function OrderTab() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const orderHistoryData = await getOrderList({ page: 1, limit: 3 });
  const orderHistoryList = orderHistoryData.ok === 1 ? orderHistoryData.item : [];

  return (
    <>
      <SubTitle className="label-l">구매 내역</SubTitle>
      <div className="bg-white py-3 mt-3">
        {orderHistoryList.map((order: OrderItem, index: number) => (
          <HistoryCard
            key={index}
            id={order._id}
            status={getOrderStatusLabel(order.state)}
            src={`${API_URL}/${order.products[0].image.path}`}
            name={order.products[0].name}
            price={order.cost.total}
            quantity={order.products.length}
            date={order.createdAt}
          />
        ))}
      </div>
    </>
  );
}
