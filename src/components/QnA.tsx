'use client';

import CheckboxButton from '@/components/CheckboxButton';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import { QnaItem } from '@/types/qna';

import React, { useState } from 'react';

function QnA({ qnaList }: { qnaList: QnaItem[] }) {
  const selectOptions = ['답변 대기', '답변 완료'];

  const [isMyQnA, setIsMyQnA] = useState(false);
  const [selectedValue, setSelectedValue] = useState('답변 상태');
  const [isOpen, setIsOpen] = useState(0);
  const [currentPage /*setCurrentPage*/] = useState(1);

  // 내 Q&A 조회
  // qnaList = isMyQnA ? qnaList.filter(qna => myId === qna.question.user._id) : qnaList;

  // 답변 상태별 Q&A 조회
  const newQnaList =
    selectedValue !== '답변 상태'
      ? qnaList.filter(qna => (selectedValue === '답변 대기' ? qna.question.repliesCount === 0 : qna.question.repliesCount > 0))
      : qnaList;

  // 현재 페이지의 게시글 목록 첫번째 index
  const startIdx = (currentPage - 1) * 5;

  return (
    <div className="mb-6 text-[14px] sm:mb-12">
      <div className="flex flex-col gap-2 mb-4 sm:gap-4 sm:items-center sm:flex-row">
        <p className="hidden me-auto sm:block">상품에 대한 문의사항을 남겨주세요.</p>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div>
            <CheckboxButton
              id="myQna"
              name="myQna"
              checked={isMyQnA}
              onChange={() => {
                setIsMyQnA(!isMyQnA);
              }}
              label="내 Q&A 보기"
            />
          </div>
          <Select
            label="답변 여부"
            showLabel={false}
            name="isAnswer"
            id="isAnswer"
            options={selectOptions}
            selectedValue={selectedValue}
            placeholder="답변 상태"
            size="small"
            onChange={e => {
              setSelectedValue(e.target.value);
            }}
          ></Select>
        </div>
      </div>
      <div>
        <div className="w-full overflow-auto whitespace-nowrap">
          {' '}
          <table className="w-full border-b-1 border-text">
            <thead className="border-t-2 border-y">
              <tr>
                <th className="p-4">제목</th>
                <th className="p-4">작성자</th>
                <th className="p-4">작성일</th>
                <th className="p-4">답변상태</th>
              </tr>
            </thead>
            <tbody>
              {newQnaList.slice(startIdx, startIdx + 5).map(qna => (
                <>
                  <tr
                    key={qna.question._id}
                    className="border-b border-b-lightgray"
                    onClick={() => {
                      setIsOpen(isOpen === qna.question._id ? 0 : qna.question._id);
                    }}
                  >
                    <td className="p-4">
                      <span className="cursor-pointer">{qna.question.title}</span>
                    </td>
                    <td className="p-4 text-center">{qna.question.user.name}</td>
                    <td className="p-4 text-center">{qna.question.createdAt.split(' ')[0]}</td>
                    {qna.question.repliesCount > 0 ? (
                      <td className="p-4 text-center text-primary">답변 완료</td>
                    ) : (
                      <td className="p-4 text-center">답변 대기</td>
                    )}
                  </tr>
                  {isOpen === qna.question._id && (
                    <tr className="p-4 border-b bg-lightgray border-b-lightgray">
                      <td colSpan={4} className="p-4 bg-lightgray">
                        <div className={`flex gap-2 ${qna.question.repliesCount > 0 && 'mb-4'}`}>
                          <span className="content-center inline-block w-6 h-6 text-xs font-semibold text-center bg-white rounded-full text-primary">
                            Q
                          </span>
                          <p>{qna.question.content}</p>
                        </div>
                        {qna.question.repliesCount > 0 && (
                          <div className="flex gap-2">
                            <span className="content-center inline-block w-6 h-6 text-xs font-semibold text-center text-white rounded-full bg-primary">
                              A
                            </span>
                            <div>
                              <p className="mb-2">{qna.answer?.content}</p>
                              <span className="text-xs text-darkgray">{qna.answer?.createdAt.split(' ')[0]}</span>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination totalPages={Math.ceil(newQnaList.length / 5)} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default QnA;
