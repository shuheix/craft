export type SingleArticleApi = {
  articles: {
    id: string;
    title: string;
    text: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    user: {
      id: string;
      name: string;
      uid: string;
      created_at: string;
      updated_at: string;
    };
    favorites: [];
  };
};
