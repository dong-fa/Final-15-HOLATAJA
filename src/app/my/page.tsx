// import QnA from '@/components/QnA';
import Tab, { TabItem } from '@/components/Tab';
import { Title } from '@/components/Typography';
import OrderTab from '@/app/my/components/OrderTab';
import BookmarkTab from '@/app/my/components/BookmarkTab';
import QnATab from '@/app/my/components/QnATab';

const tabItems: TabItem[] = [
  { id: 'info', title: '회원 정보', content: <h1>회원 정보</h1> },
  { id: 'orders', title: '구매 내역', content: <OrderTab /> },
  { id: 'bookmarks', title: '찜 목록', content: <BookmarkTab /> },
  { id: 'reviews', title: '나의 구매 후기', content: <h1>나의 구매후기</h1> },
  { id: 'qna', title: '나의 Q&A', content: <QnATab /> },
];
export default function MyPage() {
  return (
    <>
      <Title className="title">마이 페이지</Title>
      <Tab tabItems={tabItems} defaultActiveTabId={'info'} />
    </>
  );
}
