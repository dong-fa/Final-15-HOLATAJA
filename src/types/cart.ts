// 주문 아이템 인터페이스
export interface CartItemData {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    _id: number;
    name: string;
    price: number;
    seller_id: number;
    quantity: number;
    buyQuantity: number;
    image: {
      type: string;
      path: string;
      name: string;
      originalname: string;
    };
    extra: {
      isNew: boolean;
      category: string;
      option: string;
      description: string;
      'function-tag': string;
      'soundfile-path': string;
    };
  };
}

export interface CartTotalCost {
  products: string;
  shippingfees: number;
  discount: {
    products: number;
    shippingfees: number;
  };
  total: number;
}

export interface CartResponse {
  ok: number;
  item: CartItemData[];
  cost: CartTotalCost;
}
