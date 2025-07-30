'use client';

import BookmarkCard from '@/app/my/components/BookmarkCard';
import Pagination from '@/components/Pagination';
import { SubTitle } from '@/components/Typography';
import { BookmarkItemData } from '@/types/bookmark';
import { useState } from 'react';

interface BookmarkTabProps {
  bookmarkList: BookmarkItemData[];
}

export default function BookmarkTab({ bookmarkList }: BookmarkTabProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //Pagination
  const [page, setPage] = useState(1);
  const limit = 4;
  const totalPages = Math.ceil(bookmarkList.length / limit);
  const pagedBookmarkList = bookmarkList.slice((page - 1) * limit, page * limit);

  // console.log(pagedBookmarkList);
  return (
    <>
      <SubTitle className="label-l">찜 목록</SubTitle>
      <div className="bg-white py-3 mt-3">
        {pagedBookmarkList.map((item, index) => (
          <BookmarkCard
            bookmarkId={item._id}
            key={index}
            id={item.product._id}
            src={item.product.mainImages?.[0]?.path ? `${API_URL}/${item.product.mainImages[0].path}` : '/product_images/holataja_circle.webp'}
            name={item.product.name}
            price={item.product.price}
          />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
