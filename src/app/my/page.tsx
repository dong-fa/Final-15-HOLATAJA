import Tab, { TabItem } from '@/components/Tab';
import { Title } from '@/components/Typography';
import OrderTab from '@/app/my/components/OrderTab';
import BookmarkTab from '@/app/my/components/BookmarkTab';
import QnATab from '@/app/my/components/QnATab';
import ReviewTab from '@/app/my/components/ReviewTab';
import UserInfo from './components/UserInfo';
import { getOrderList } from '@/data/functions/order';
import { getBookmarkList } from '@/data/functions/bookmark';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 - HOLATAJA',
  description: '회원님의 정보와 활동 내역을 확인할 수 있습니다.',
  robots: 'noindex, nofollow', // 검색엔진 노출 방지
};

export default async function MyPage() {
  // 구매 내역 목록 데이터 불러오기
  const orderHistoryData = await getOrderList();
  const orderHistoryList = orderHistoryData.ok === 1 ? orderHistoryData.item : [];

  // 찜 목록 데이터 불러오기
  const bookmarkData = await getBookmarkList();
  const bookmarkList = bookmarkData.ok === 1 ? bookmarkData.item : [];

  const tabItems: TabItem[] = [
    { id: 'info', title: '회원 정보', content: <UserInfo /> },
    { id: 'orders', title: '구매 내역', content: <OrderTab orderHistoryList={orderHistoryList} /> },
    { id: 'bookmarks', title: '찜 목록', content: <BookmarkTab bookmarkList={bookmarkList} /> },
    { id: 'reviews', title: '나의 구매 후기', content: <ReviewTab /> },
    { id: 'qna', title: '나의 Q&A', content: <QnATab /> },
  ];

  return (
    <>
      <Title className="mb-6">마이 페이지</Title>
      <Tab tabItems={tabItems} defaultActiveTabId={'info'} />
    </>
  );
}
