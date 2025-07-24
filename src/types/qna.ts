// 문의 게시글
export interface QuestionItem {
  _id: number;
  type: string;
  product_id: number;
  title: string;
  content: string;
  views: number;
  user: {
    _id: number;
    type: string;
    name: string;
    email: string;
    image: null;
  };
  createdAt: string;
  updatedAt: string;
  seller_id: number;
  product: {
    name: string;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
  };
  bookmarks: number;
  repliesCount: number;
}

// 답변 댓글
export interface AnswerItem {
  content: string;
  user: {
    name: string;
  };
  _id: number;
  createdAt: string;
  updatedAt: string;
}

// 문의와 답변
export interface QnaItem {
  question: QuestionItem;
  answer: AnswerItem | null;
}
