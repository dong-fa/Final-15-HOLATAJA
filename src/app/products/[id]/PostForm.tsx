'use client';

import Rating from '@/app/products/[id]/Rating';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Textarea from '@/components/Textarea';
import { Contents } from '@/components/Typography';
import { ApiRes, ApiResPromise } from '@/types/api';
import { useRouter } from 'next/navigation';

import React, { useActionState, useEffect, useState } from 'react';

interface PostFormProps<itemState> {
  productId: number;
  orderId?: number;
  action: (state: ApiRes<itemState> | null, formData: FormData) => ApiResPromise<itemState>;
  type: 'Q&A' | '구매 후기';
}

export default function PostForm<itemState>({ productId, orderId, action, type }: PostFormProps<itemState>) {
  const [state, formAction /* isPending*/] = useActionState(action, null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 별점 등록 상태
  const [rating, setRating] = useState<number>(0);

  console.log(state);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      // 목록 화면 갱신
      router.refresh();
      // 별점 초기화
      setRating(0);
    }

    if (state?.ok === 1 || (state?.ok === 0 && !state.errors)) {
      // 등록 성공/실패(서버 오류) 시 모달 표시
      setIsModalOpen(true);
    }
  }, [state]); // state가 변경될 때마다 모달 상태 변경

  return (
    <div>
      <Contents size="large" className="mb-4">
        {`${type} 등록하기`}
      </Contents>
      <form className="flex flex-col gap-4" action={formAction}>
        {type === '구매 후기' && <input type="hidden" name="order_id" defaultValue={orderId} />}
        {type === 'Q&A' && <input type="hidden" name="type" defaultValue="qna" />}
        <input type="hidden" name="product_id" defaultValue={productId ?? ''} />
        {type === 'Q&A' && (
          <div>
            <label htmlFor="title" className="mb-2 inline-block">
              제목
            </label>
            <Input id="title" name="title" type="text" className="bg-white" error={!state?.ok && !!state?.errors?.title} />
            {!state?.ok && <p className="label-s text-negative mt-1">{state?.errors?.title?.msg}</p>}
          </div>
        )}
        {type === '구매 후기' && (
          <div>
            <span className="sr-only">{`별점 ${rating}/5점`}</span>
            <Rating rating={rating} setRating={(rating: number) => setRating(rating)} editable />
            <input type="hidden" name="rating" value={rating ?? 0} />
          </div>
        )}
        <div>
          <label htmlFor="content" className={`mb-2 inline-block ${type === '구매 후기' && 'sr-only'}`}>
            내용
          </label>
          <Textarea id="content" name="content" error={!state?.ok && !!state?.errors?.content} />
          {!state?.ok && <p className="label-s text-negative mt-1">{state?.errors?.content?.msg}</p>}
        </div>
        <div className="flex justify-end">
          <Button size="small" submit>
            등록
          </Button>
        </div>
      </form>

      {/* 등록 완료/실패 모달 */}
      <Modal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleConfirm={() => setIsModalOpen(false)}
        description={state?.ok ? `${type} 등록이 완료되었습니다.` : `${type} 등록에 실패했습니다.`}
        hideCancelButton
      ></Modal>
    </div>
  );
}
