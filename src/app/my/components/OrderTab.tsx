import HistoryCard from '@/app/my/components/HistoryCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { getOrderList } from '@/data/functions/order';
import { getOrderStatusLabel } from '@/data/tables/mappingTables';

export default async function OrderTab() {
  const orderHistoryData = await getOrderList();
  const orderHistoryList = orderHistoryData.ok === 1 ? orderHistoryData.item : [];

  return (
    <>
      <SubTitle className="label-l">구매 내역</SubTitle>
      <div className="bg-white py-3 mt-3">
        {orderHistoryList.map((order, index) => (
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
