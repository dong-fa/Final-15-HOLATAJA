export interface OrderListResponse {
  ok: number;
  item: OrderItem[];
  pagination: PaginationInfo;
}

export interface OrderItem {
  _id: number;
  user_id: number;
  state: string;
  createdAt: string;
  updatedAt: string;
  products: {
    _id: number;
    quantity: number;
    seller_id: number;
    name: string;
    price: number;
    image: {
      type: string;
      originalname: string;
      name: string;
      path: string;
    };
    extra: {
      isNew: boolean;
      category: string;
      option: string[];
      summary_description?: string;
      full_description?: string;
      description?: string;
      'function-tag': string;
      'soundfile-path': string;
    };
  }[];
  options: {
    option: string;
  }[];
  address: {
    name: string;
    value: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  payment: {
    method: string;
    info: string;
  };
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
