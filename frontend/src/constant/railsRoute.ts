export const defaultApi = "http://localhost:3000/api/v1";

// Application Root
export const rootApi = `${defaultApi}/articles`;

// article controller
export const articleApi = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;

// rails_users_controller

export const USERS_URI = `${defaultApi}/users`;

// useHistory
export const INDEX_ARTICLE_URI = "/articles";
export const NEW_ARTICLE_URI = "/articles/new";
