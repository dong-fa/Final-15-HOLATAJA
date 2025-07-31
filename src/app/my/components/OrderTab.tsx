'use client';

import HistoryCard from '@/app/my/components/HistoryCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { getOrderStatusLabel } from '@/data/tables/mappingTables';
import { OrderItem } from '@/types/order';
import { History } from 'lucide-react';
import { useState } from 'react';

interface OrderTabProps {
  orderHistoryList: OrderItem[];
}
export default function OrderTab({ orderHistoryList }: OrderTabProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //Pagination
  const [page, setPage] = useState(1);
  const limit = 3;
  const totalPages = Math.ceil(orderHistoryList.length / limit);
  const pagedOrderList = orderHistoryList.slice((page - 1) * limit, page * limit);

  return (
    <>
      <SubTitle className="label-l">구매 내역</SubTitle>
      <div className="bg-white py-3 mt-3">
        {!pagedOrderList.length ? (
          <div className="flex flex-col items-center py-8 border-b-1 border-b-lightgray">
            <History className="mb-4" size={32} />
            <p>구매 내역이 없습니다.</p>
          </div>
        ) : (
          pagedOrderList.map((order: OrderItem, index: number) => (
            <HistoryCard
              key={index}
              id={order._id}
              status={getOrderStatusLabel(order.state)}
              src={order.products?.[0]?.image?.path ? `${API_URL}/${order.products[0].image.path}` : '/product_images/holataja_circle.webp'}
              name={order.products[0].name}
              price={order.cost.total}
              quantity={order.products.length}
              date={order.createdAt}
            />
          ))
        )}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
