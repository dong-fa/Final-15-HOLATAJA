'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PrdInfoQuantity from '@/components/PrdInfoQuantity';
import { addToCart } from '@/data/actions/product';
import { ApiRes } from '@/types/api';
import { ProductInfo } from '@/types/product';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';

function ProductPostForm({ productData }: { productData: ApiRes<ProductInfo> }) {
  const router = useRouter();

  const [option, setOption] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartSuccessModal, setCartSuccessModal] = useState(false);
  const [cartFailModal, setCartFailModal] = useState(false);
  const [purchaseFailModal, setPurchaseFailModal] = useState(false);

  const [state, formAction, isPending] = useActionState(addToCart, null);
  console.log(state);
  useEffect(() => {
    if (state?.ok === 1) {
      setCartSuccessModal(true);
    } else if (state?.ok === 0) {
      setCartFailModal(true);
    }
  }, [state]);

  return (
    <div>
      <form
        action={async formData => {
          if (!option) {
            setCartFailModal(true);
          } else {
            await formAction(formData);
          }
        }}
      >
        <input type="hidden" name="product_id" value={productData.ok === 1 ? productData.item._id : 0} />
        <div className="mb-4">
          <span className="inline-block mb-2 font-semibold">옵션</span>
          <div className="flex flex-wrap gap-2">
            {productData.ok === 1 &&
              productData.item?.extra?.option?.map((prdOption, idx) => (
                <Button key={idx} size="medium" select={prdOption !== option} outlined={prdOption === option} onClick={() => setOption(prdOption)}>
                  {prdOption}
                </Button>
              ))}
          </div>
          <input type="hidden" name="color" value={option ?? ''} />
        </div>
        <div className="flex flex-col gap-4">
          <PrdInfoQuantity quantity={quantity} handleCountQuantity={setQuantity} />
          <input type="hidden" name="quantity" value={quantity} />
          <div className="flex flex-row gap-2 sm:gap-4">
            <Button outlined size="full" submit>
              장바구니
            </Button>
            <Button size="full">구매하기</Button>
          </div>
        </div>
      </form>
      {/* 장바구니 추가 완료 모달 */}
      <Modal
        isOpen={cartSuccessModal}
        handleClose={() => setCartSuccessModal(false)}
        handleConfirm={() => {
          router.push('/carts');
        }}
        description="상품이 장바구니에 추가되었습니다."
        isChoiceModal
        choiceOptions={['계속 쇼핑하기', '장바구니로 이동']}
      />

      {/* 장바구니 추가 실패 모달 */}
      <Modal
        isOpen={cartFailModal}
        handleClose={() => setCartFailModal(false)}
        handleConfirm={() => setCartFailModal(false)}
        description={option ? '장바구니 추가에 실패했습니다.' : '옵션을 선택해주세요.'}
        hideCancelButton
      />

      {/* 구매 실패 모달 */}
      {/* <Modal isOpen={} handleClose={} handleConfirm={} /> */}
    </div>
  );
}

export default ProductPostForm;
