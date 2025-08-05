import Review from '@/app/products/[id]/Review';
import { SubTitle } from '@/components/Typography';
import { getMyReview } from '@/data/functions/review';
import { ReviewItem } from '@/types/review';

export default async function ReviewTab() {
  // 사용자가 작성한 구매후기 가져오기
  const reviewData = await getMyReview();

  let reviewList: ReviewItem[] = [];
  // 구매후기 데이터 reviewList에 저장
  if (reviewData.ok === 1) {
    reviewList = reviewData.item;
  }

  return (
    <>
      <SubTitle className="label-l">나의 구매 후기</SubTitle>
      <Review reviewList={reviewList} />
    </>
  );
}
