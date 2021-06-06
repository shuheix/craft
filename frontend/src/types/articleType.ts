export type ArticleType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type ArticleApiType = {
  articles: ArticleType[];
};
