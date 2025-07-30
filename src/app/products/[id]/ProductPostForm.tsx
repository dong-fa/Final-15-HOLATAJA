'use client';

import Button from '@/components/Button';
import PrdInfoQuantity from '@/components/PrdInfoQuantity';
import { ApiRes, ApiResPromise } from '@/types/api';
import { ProductInfo } from '@/types/product';
import React, { useActionState, useState } from 'react';

function ProductPostForm({ productData }: { productData: ApiRes<ProductInfo> }) {
  const [option, setOption] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  // const [] = useActionState(postProduct, null);

  return (
    <div>
      <form>
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
        </div>
        <div className="flex flex-col gap-4">
          <PrdInfoQuantity
            quantity={quantity}
            handleCountQuantity={() => {
              setQuantity(quantity);
            }}
          />
          <div className="flex flex-row gap-2 sm:gap-4">
            <Button outlined size="full">
              장바구니
            </Button>
            <Button size="full">구매하기</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductPostForm;
