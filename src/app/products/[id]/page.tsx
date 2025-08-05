import React from 'react';
import Image from 'next/image';

import { QnaItem, QuestionItem } from '@/types/qna';
import { getAnswer, getQuestion } from '@/data/functions/qna';
import getReview from '@/data/functions/review';
import getProduct from '@/data/functions/product';
import { postReview } from '@/data/actions/review';
import { postQuestion } from '@/data/actions/qna';

import { ContentsTitle, SubTitle, Title } from '@/components/Typography';
import Tab, { TabItem } from '@/components/Tab';
import ProductImg from '@/components/ProductImg';
import QnA from '@/components/QnA';
import KeySoundDemo from '@/app/products/components/KeySoundDemo';

import ProductPostForm from '@/app/products/[id]/ProductPostForm';
import PostForm from '@/app/products/[id]/PostForm';
import Review from '@/app/products/[id]/Review';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductInfo({ params }: PageProps) {
  const { id } = await params;

  // 상품 상세 조회
  const productData = await getProduct(Number(id));

  // 상품 문의 목록 조회
  const questionData = await getQuestion();

  // 상품 id와 일치하는 문의 목록
  const questionList = questionData.ok === 1 ? questionData.item.filter((question: QuestionItem) => question.product_id === Number(id)) : [];

  // 상품 구매 후기 목록 조회
  const reviewData = await getReview(Number(id));

  const tabItems: TabItem[] = [
    {
      id: '1',
      title: '제품 상세 정보',
      content: (
        <div className="flex flex-col gap-6 px-4 sm:gap-12">
          <div>
            <ContentsTitle className="mb-4">제품 소개</ContentsTitle>
            <p>{productData.ok === 1 && productData.item?.extra.description}</p>
          </div>
          <div>
            <ContentsTitle className="mb-4">기능</ContentsTitle>
            <ul className="grid gap-2 sm:gap-4 sm:grid-cols-3">
              {/* {productData?.extra['function-tag'].map((tag, idx) => (
                <li key={idx} className="flex items-center justify-center h-16 gap-2 p-4 font-semibold bg-white border rounded-lg border-lightgray">
                  <KeyRound />
                  <div>tag</div>
                </li>
              ))} */}
            </ul>
          </div>
          <div className="rounded-lg bg-lightgray px-5 py-3 hidden sm:block">
            {productData.ok === 1 && <KeySoundDemo switchType={productData.item?.extra?.category} />}
          </div>
          {productData.ok === 1 &&
            (productData.item?.mainImages.filter(img => img.type === 'info').map(img => img.path) ?? []).map((img, idx) => (
              <div key={idx} className="relative w-full">
                <Image src={img} alt="" width={0} height={0} priority sizes="100%" className="object-scale-down w-full h-auto" />
              </div>
            ))}
        </div>
      ),
    },
    {
      id: '2',
      title: '구매 후기',
      content: (
        <div className="flex flex-col gap-6 sm:gap-12 p-4 mt-[-2rem]">
          <Review reviewList={reviewData.ok ? reviewData.item : []} />
          {/* TODO orderId 받아오기: 내 구매 목록 조회 후 productId가 일치하는 목록 filter */}
          <PostForm productId={Number(id)} orderId={Number(id)} action={postReview} type="구매 후기" />
        </div>
      ),
    },
    {
      id: '3',
      title: 'Q&A',
      content: (
        <div className="flex flex-col gap-6 sm:gap-12 p-4 mt-[-1rem]">
          <QnA qnaList={questionList} />
          <PostForm productId={Number(id)} action={postQuestion} type="Q&A" />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <Title>상품 상세</Title>
      <div className="grid sm:grid-cols-2 gap-9">
        <ProductImg
          title={productData.ok === 1 ? productData.item?.name : ''}
          srcList={productData.ok === 1 ? productData.item?.mainImages.filter(img => img.type === 'detail').map(img => img.path) : []}
          productId={productData.ok === 1 ? productData.item._id : 0}
          bookmarkId={productData.ok === 1 ? productData.item.myBookmarkId : 0}
          swipe
        ></ProductImg>
        <div className="flex flex-col self-center gap-4">
          <div>
            <SubTitle className="mb-2">{productData.ok === 1 ? productData.item?.name : ''}</SubTitle>
            <p className="text-secondary">{productData.ok === 1 && productData.item?.content}</p>
          </div>
          <div>
            <span className="text-2xl font-bold">{productData.ok === 1 && productData.item?.price?.toLocaleString()}원</span>
          </div>
          <ProductPostForm productData={productData} />
        </div>
      </div>
      <Tab tabItems={tabItems} />
    </div>
  );
}
