'use client';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import { deleteQnA } from '@/data/actions/qna';
import useAuthStore from '@/store/authStore';
import { QnaItem } from '@/types/qna';
import { CircleAlert, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { startTransition, useState } from 'react';

function QnA({ qnaList, my }: { qnaList: QnaItem[]; my?: boolean }) {
  const selectOptions = ['답변 대기', '답변 완료'];

  const [isMyQnA, setIsMyQnA] = useState(false);
  const [selectedValue, setSelectedValue] = useState('답변 상태');
  const [isOpen, setIsOpen] = useState(0);
  const [currentPage /*setCurrentPage*/] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { user } = useAuthStore();
  const router = useRouter();

  // 내 Q&A 조회
  qnaList = isMyQnA ? qnaList.filter(qna => user?._id === qna.question.user._id) : qnaList;

  // 답변 상태별 Q&A 조회
  const newQnaList =
    selectedValue !== '답변 상태'
      ? qnaList.filter(qna => (selectedValue === '답변 대기' ? qna.question.repliesCount === 0 : qna.question.repliesCount > 0))
      : qnaList;

  // 현재 페이지의 게시글 목록 첫번째 index
  const startIdx = (currentPage - 1) * 5;

  // Q&A 삭제
  const handleDelete = (_id: number) => {
    startTransition(async () => {
      try {
        await deleteQnA(_id);
        setIsConfirmModalOpen(false);
        router.refresh();
      } catch (error) {
        console.error(error);
        setIsConfirmModalOpen(false);
        setIsFailModalOpen(true);
      }
    });
  };

  return (
    <div className="text-[14px]">
      <div className="flex flex-col gap-2 mb-4 sm:gap-4 sm:items-center sm:flex-row">
        <p className="hidden me-auto sm:block">{my ? 'Q&A 답변 현황을 확인해보세요.' : '상품에 대한 문의사항을 남겨주세요.'}</p>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div>
            {my ? (
              ''
            ) : (
              <CheckboxButton
                id="myQna"
                name="myQna"
                checked={isMyQnA}
                onChange={() => {
                  setIsMyQnA(!isMyQnA);
                }}
                label="내 Q&A 보기"
              />
            )}
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
                {my ? '' : <th className="p-4">작성자</th>}
                <th className="p-4">작성일</th>
                <th className="p-4">답변상태</th>
                {my ? <th className="py-4 px-2">문의 제품</th> : ''}
              </tr>
            </thead>
            <tbody>
              {!newQnaList.length ? (
                <tr>
                  <td colSpan={4} align="center" className="py-8">
                    <CircleAlert className="mb-4" size={32} />
                    <p>작성된 Q&A가 없습니다.</p>
                  </td>
                </tr>
              ) : (
                newQnaList.slice(startIdx, startIdx + 5).map(qna => (
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
                      {my ? '' : <td className="p-4 text-center">{qna.question.user.name}</td>}
                      <td className="p-4 text-center">{qna.question.createdAt.split(' ')[0]}</td>
                      {qna.question.repliesCount > 0 ? (
                        <td className="p-4 text-center text-primary">답변 완료</td>
                      ) : (
                        <td className="p-4 text-center">답변 대기</td>
                      )}
                      {my ? (
                        <td className="text-center">
                          <Link
                            href={`/products/${qna.question.product_id}`}
                            className=" py-1 px-2 w-[2rem] border-1 border-primary rounded-lg transition duration-200 ease-in-out bg-white text-primary hover:bg-accent"
                          >
                            보러 가기
                          </Link>
                        </td>
                      ) : (
                        ''
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
                            {user?._id === qna.question.user._id && (
                              <div className="flex ms-auto">
                                <Button icon size="small" aria-label="수정">
                                  <Pencil color="var(--color-darkgray)" size={20} />
                                </Button>
                                <Button
                                  icon
                                  size="small"
                                  aria-label="삭제"
                                  onClick={() => {
                                    setSelectedId(qna.question._id);
                                    setIsConfirmModalOpen(true);
                                  }}
                                >
                                  <Trash color="var(--color-darkgray)" size={20} />
                                </Button>
                              </div>
                            )}
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
                ))
              )}
            </tbody>
          </table>
        </div>
        {newQnaList.length ? <Pagination totalPages={Math.ceil(newQnaList.length / 5)} currentPage={currentPage} /> : null}
      </div>
      <Modal
        isOpen={isConfirmModalOpen}
        handleClose={() => setIsConfirmModalOpen(false)}
        handleConfirm={() => selectedId && handleDelete(selectedId)}
        description="정말 삭제하시겠습니까?"
      ></Modal>
      {/* 삭제 실패 모달 */}
      <Modal
        isOpen={isFailModalOpen}
        handleClose={() => setIsFailModalOpen(false)}
        handleConfirm={() => setIsFailModalOpen(false)}
        description="삭제가 실패하였습니다."
        hideCancelButton
      ></Modal>
    </div>
  );
}

export default QnA;
