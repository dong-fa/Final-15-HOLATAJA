import QnA from '@/components/QnA';
import { SubTitle } from '@/components/Typography';
import { getMyQnA, getAnswer } from '@/data/functions/qna';
import { QnaItem, QuestionItem } from '@/types/qna';

export default async function QnATab() {
  // 사용자가 작성한 질문글 가져오기
  const questionData = await getMyQnA();
  const questionList = questionData.ok === 1 ? questionData.item : [];

  return (
    <>
      <SubTitle className="label-l">나의 Q&A</SubTitle>
      <QnA qnaList={questionList} my={true} />
    </>
  );
}
