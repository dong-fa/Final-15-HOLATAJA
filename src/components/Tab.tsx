'use client';

import { useState } from 'react';

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function Tab() {  
  
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
    <div className="w-full mx-auto">
      {/* Tab Nav */}
      <nav className="">
        {tabItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? 'inline-block w-auto p-4 cursor-pointer text-primary font-bold border-b-2 border-b-primary'
                : 'inline-block w-auto p-4 cursor-pointer text-secondary hover:border-b-2 hover:border-b-primary'
            }
          >
            {tab.title}
          </button>
        ))}
      </nav>

      {/* Gray Line */}
      <hr className=" border-t-2 border-lightgray relative top-[-2px] -z-1" />

      {/* Tab Content */}
      <div className=" mt-4">{tabItems.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  );
}
