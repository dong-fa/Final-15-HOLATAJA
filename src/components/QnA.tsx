import CheckboxButton from '@/components/CheckboxButton';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import React, { useState } from 'react';

function QnA() {
  const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(0);

  return (
    <div className="mb-6 text-sm sm:mb-12">
      <div className="flex flex-col gap-2 mb-4 sm:gap-4 sm:items-center sm:flex-row">
        <p className="hidden me-auto sm:block">상품에 대한 문의사항을 남겨주세요.</p>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div>
            <CheckboxButton
              id="myQna"
              name="myQna"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              label="내 Q&A 보기"
              style={{ fontSize: '.875rem' }}
            />
          </div>
          <Select
            label="답변 여부"
            showLabel={false}
            name="isAnswer"
            id="isAnswer"
            options={['답변 대기', '답변 완료']}
            selectedValue=""
            placeholder="답변 상태"
            size="small"
            onChange={() => {}}
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
            <tbody className="text-sm">
              <tr
                className="border-b border-b-lightgray"
                onClick={() => {
                  setIsOpen(1);
                }}
              >
                <td className="p-4">
                  <p>안녕하세요. 이 키보드를 킥보드 대신 써도 될까요?</p>
                </td>
                <td className="p-4 text-center">김*두</td>
                <td className="p-4 text-center">2025.07.10</td>
                <td className="p-4 text-center text-darkgray">답변대기</td>
              </tr>
              <tr
                className="border-b border-b-lightgray"
                onClick={() => {
                  setIsOpen(isOpen === 2 ? 0 : 2);
                }}
              >
                <td className="p-4">
                  <span className="cursor-pointer">이 키보드를 사서 타건음을 음원에 넣는다면 저작권료를 떼드려야 하나요?</span>
                </td>
                <td className="p-4 text-center">배*벤</td>
                <td className="p-4 text-center">2025.07.07</td>
                <td className="p-4 text-center text-primary">답변완료</td>
              </tr>
              {isOpen === 2 && (
                <tr className="p-4 bg-lightgray">
                  <td colSpan={4} className="p-4 bg-lightgray">
                    <div className="flex gap-2 mb-4">
                      <span className="content-center inline-block w-6 h-6 text-xs font-semibold text-center bg-white rounded-full text-primary">
                        Q
                      </span>
                      <p>아직 작곡할 줄 모르긴 한데</p>
                    </div>
                    <div className="flex gap-2">
                      {' '}
                      <span className="content-center inline-block w-6 h-6 text-xs font-semibold text-center text-white rounded-full bg-primary">
                        A
                      </span>
                      <div>
                        <p className="mb-2">멜론에 올리고 나서 다시 문의 주세요. 올라타자 담당자 드림. </p>
                        <span className="text-xs text-darkgray">2025/07/11</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              <tr
                onClick={() => {
                  setIsOpen(3);
                }}
              >
                <td className="px-4 py-5">
                  <p>키키키키키보드드드듣드가여여영여영러번씩 누누누누누눌렬려려려려려렬요요요요</p>
                </td>
                <td className="px-4 py-5 text-center">흑*흑</td>
                <td className="px-4 py-5 text-center">2025.07.05</td>
                <td className="px-4 py-5 text-center text-primary">답변완료</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination totalPages={5} currentPage={1} />
      </div>
    </div>
  );
}

export default QnA;
