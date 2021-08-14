export const defaultApi = "http://localhost:3000/api/v1";

// Application Root
export const rootApi = `${defaultApi}/articles`;

// article controller
export const articleApi = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;

// rails_users_controller
export const USERS_URI = `${defaultApi}/users`;
export const SHOW_USERS_URI = (usersId: string) => `${USERS_URI}/${usersId}`;

// useHistory
export const INDEX_ARTICLE_URI = "/articles";
export const NEW_ARTICLE_URI = "/articles/new";
export const SHOW_ARTICLE_URI = (articleId: string) => `/articles/${articleId}`;
export const SHOW_USER_URL = (usersId: string) => `/users/${usersId}`;
