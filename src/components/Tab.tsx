'use client';

import { useState } from 'react';

export default function Tab() {
  interface TabItem {
    id: string;
    title: string;
    content: React.ReactNode;
  }

  const tabItems: TabItem[] = [
    {
      id: 'profile',
      title: '회원 정보',
      content: <div className="sub-title">회원 정보</div>,
    },
    {
      id: 'purchase-history',
      title: '구매 내역',
      content: <div className="sub-title">구매 내역</div>,
    },
    {
      id: 'wishlist',
      title: '찜 목록',
      content: <div className="sub-title">찜 목록</div>,
    },
    {
      id: 'reviews',
      title: '나의 구매 후기',
      content: <div className="sub-title">나의 구매 후기</div>,
    },
    {
      id: 'qna',
      title: '나의 Q&A',
      content: <div className="sub-title">나의 Q&A</div>,
    },
  ];

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      {/* Tab Nav */}
      <nav className="w-full  mx-auto border-b-2 border-b-lightgray">
        {tabItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? 'inline-block w-auto p-4 text-primary font-bold border-b-2 border-b-primary'
                : 'inline-block w-auto p-4 text-secondary hover:border-b-2 hover:border-b-lightgray'
            }
          >
            {tab.title}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="w-full mx-auto mt-4">{tabItems.find(tab => tab.id === activeTab)?.content}</div>
    </>
  );
}
