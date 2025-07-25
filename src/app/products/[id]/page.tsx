import Review from '@/app/products/[id]/Review';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import ProductImg from '@/components/ProductImg';
import QnA from '@/components/QnA';
// import QuantityCount from '@/components/QuantityCount';
import ReviewCard from '@/components/ReviewCard';
import SoundToggle from '@/components/SoundToggle';
import Tab, { TabItem } from '@/components/Tab';
import Textarea from '@/components/Textarea';
import { Contents, ContentsTitle, SubTitle, Title } from '@/components/Typography';
import getProduct from '@/data/functions/product';
import { getAnswer, getQuestion } from '@/data/functions/qna';
import getReview from '@/data/functions/review';
import { QnaItem, QuestionItem } from '@/types/qna';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 상품 구매 시 전달할 정보
// const purchaseData = [];

export default async function ProductInfo({ params }: PageProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { id } = await params;
  // const [quantity, setQuantity] = useState(0);

  // 상품 상세 조회
  const productData = await getProduct(Number(id));

  // 상품 문의 목록 조회
  const questionData = await getQuestion();
  // 상품 id와 일치하는 문의 목록
  const questionList = questionData.ok === 1 ? questionData.item.filter((question: QuestionItem) => question.product_id === Number(id)) : [];

  // 상품 문의와 답변을 묶어서 저장
  const qnaList: QnaItem[] = [];

  if (questionData.ok === 1) {
    // 모든 비동기 작업이 끝나면 결과를 배열로 반환
    await Promise.all(
      questionList.map(async (question: QuestionItem) => {
        // 문의글 id와 일치하는 답변 조회
        const res = await getAnswer(question._id);
        // 답변 조회 성공 시 question 정보와 answer 정보 함께 저장, 실패 시 question 정보만 저장
        qnaList.push({ question: question, answer: res.ok === 1 ? res.item[0] : null });
      }),
    );
  }

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
          <div className="rounded-lg bg-lightgray">
            <SoundToggle />
            <div>{/* 키보드 */}</div>
          </div>
          {productData.ok === 1 &&
            (productData.item?.mainImages.filter(img => img.type === 'info').map(img => API_URL + '/' + img.path) ?? []).map((img, idx) => (
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
          <div className="flex flex-col gap-4">
            <Contents size="large">구매 후기 등록하기</Contents>
            <div className="flex">
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
              <Star color="var(--color-gray)" size={28} />
            </div>
            <Textarea name="" id="" />
            <div className="flex justify-end">
              <Button size="small">문의하기</Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: 'Q&A',
      content: (
        <div className="flex flex-col gap-6 sm:gap-12 p-4 mt-[-1rem]">
          <QnA qnaList={qnaList} />
          <div className="flex flex-col gap-4">
            <label htmlFor="">
              <Contents size="large">Q&A 등록하기</Contents>
            </label>
            <Textarea id="" name="" />
            <div className="flex justify-end">
              <Button size="small">등록</Button>
            </div>
          </div>
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
          srcList={productData.ok === 1 ? productData.item?.mainImages.filter(img => img.type === 'detail').map(img => API_URL + '/' + img.path) : []}
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
          <div>
            <span className="inline-block mb-2 font-semibold">옵션</span>
            <div className="flex flex-wrap gap-2">
              {productData.ok === 1 &&
                productData.item?.extra?.option?.map((option, idx) => (
                  <Button key={idx} size="medium" select>
                    {option}
                  </Button>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/*  useState를 쓰는 방식으로 변경해야 함 */}
            {/* <QuantityCount handleCountQuantity={num => setQuantity(num)} quantity={quantity} /> */}
            <div className="flex flex-row gap-2 sm:gap-4">
              <Button outlined size="full">
                장바구니
              </Button>
              <Button size="full">구매하기</Button>
            </div>
          </div>
        </div>
      </div>
      <Tab tabItems={tabItems} />
    </div>
  );
}
