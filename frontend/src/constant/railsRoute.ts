export const defaultApi = "http://localhost:3000/api/v1";

// Application Root
export const rootApi = `${defaultApi}/articles`;

// article controller
export const articleApi = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;
