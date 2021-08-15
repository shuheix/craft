export const defaultApi = "http://localhost:3000/api/v1";

// article controller

export const INDEX_ARTICLES_API = (page: string | null): string =>
  `${defaultApi}/articles${page}`;

export const SINGLE_ARTICLE_API = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;

// rails_users_controller
export const USERS_API = `${defaultApi}/users`;
export const SHOW_USERS_API = (usersId: string) => `${USERS_API}/${usersId}`;
