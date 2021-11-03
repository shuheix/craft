export type ArticleType = {
  id: string;
  title: string;
  text: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  image: {
    url: string;
  };
};
