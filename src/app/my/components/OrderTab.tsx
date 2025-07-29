'use client';

import HistoryCard from '@/app/my/components/HistoryCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { getOrderStatusLabel } from '@/data/tables/mappingTables';
import { OrderItem } from '@/types/order';
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
        {pagedOrderList.map((order: OrderItem, index: number) => (
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
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
