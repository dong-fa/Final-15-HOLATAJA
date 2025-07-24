// 상품 상세
export interface ProductInfo {
  _id: number;
  price: number;
  quantity: number;
  name: string;
  content: string;
  show: boolean;
  active: boolean;
  mainImages: {
    type: 'detail' | 'info';
    originalname: string;
    name: string;
    path: string;
  }[];
  extra: {
    isNew: boolean;
    category: 'BLUE' | 'BROWN' | 'RED' | 'OTHER';
    option: string[];
    description: string;
    'function-tag': string[];
    'soundfile-path': string;
  };
  shippingFees: number;
  seller_id: number;
  buyQuantity: number;
  createdAt: string;
  updatedAt: string;
  seller: {
    _id: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    extra: {
      birthday: string;
      address: { id: number; name: string; value: string }[];
    };
  };
  replies: {
    _id: number;
    rating: number;
    content: string;
    user_id: number;
    user: {
      _id: number;
      name: string;
      image: null;
    };
    createdAt: '2025.07.17 11:16:18';
  }[];
  bookmarks: number;
  options: [];
}
