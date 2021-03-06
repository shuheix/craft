export type ArticleType = {
  id: string;
  uid: string;
  title: string;
  text: string;
  user_id: string;
  is_answerd: boolean;
  created_at: string;
  updated_at: string;
  user_name?: string;
  avatar?: string;
  image: {
    url: string;
  };
};
