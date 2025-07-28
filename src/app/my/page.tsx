import Tab, { TabItem } from '@/components/Tab';
import { Title } from '@/components/Typography';
import OrderTab from '@/app/my/components/OrderTab';
import BookmarkTab from '@/app/my/components/BookmarkTab';
import QnATab from '@/app/my/components/QnATab';
import ReviewTab from '@/app/my/components/ReviewTab';
import UserInfo from './components/UserInfo';

const tabItems: TabItem[] = [
  { id: 'info', title: '회원 정보', content: <UserInfo /> },
  { id: 'orders', title: '구매 내역', content: <OrderTab /> },
  { id: 'bookmarks', title: '찜 목록', content: <BookmarkTab /> },
  { id: 'reviews', title: '나의 구매 후기', content: <ReviewTab /> },
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
