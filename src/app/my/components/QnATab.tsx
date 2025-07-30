import QnA from '@/components/QnA';
import { SubTitle } from '@/components/Typography';
import { getMyQnA, getAnswer } from '@/data/functions/qna';
import { QnaItem, QuestionItem } from '@/types/qna';

export default async function QnATab() {
  // 사용자가 작성한 질문글 가져오기
  const questionData = await getMyQnA();

  // 상품 문의와 답변을 묶어서 저장
  const qnaList: QnaItem[] = [];
  const questionList = questionData.ok === 1 ? questionData.item : [];

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

  return (
    <>
      <SubTitle className="label-l">나의 Q&A</SubTitle>
      <div className="bg-white py-3 px-3 mt-3">
        <QnA qnaList={qnaList} my={true} />
      </div>
    </>
  );
}
