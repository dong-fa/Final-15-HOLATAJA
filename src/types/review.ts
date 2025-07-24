// 구매 후기
export interface ReviewItem {
  _id: number;
  rating: number;
  content: string;
  user: {
    _id: number;
    name: string;
  };
  createdAt: string;
  product: {
    _id: number;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
    name: string;
  };
}
