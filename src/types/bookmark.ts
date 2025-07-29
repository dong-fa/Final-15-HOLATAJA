export interface BookmarkData {
  _id: number;
  user_id: number;
  createdAt: string;
  product: {
    _id: number;
    name: string;
    price: number;
    quantity: number;
    buyQuantity: number;
    mainImages: {
      type: 'detail' | 'info';
      originalname: string;
      name: string;
      path: string;
    }[];
    extra: {
      isNew: boolean;
      category: string;
      option: string[];
      description: string;
      'function-tag': string;
      'soundfile-path': string;
    };
  };
}
