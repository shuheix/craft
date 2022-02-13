let defaultApi = "";

if (process.env.NODE_ENV === "development") {
  defaultApi = "http://localhost:3000/api/v1";
}

if (process.env.NODE_ENV === "test") {
  defaultApi = "http://localhost:3000/api/v1";
}

if (process.env.NODE_ENV === "production") {
  defaultApi = "https://crafts-app.com/api/v1";
}

// article controller
export const INDEX_ARTICLES_API = (page?: string) => {
  if (page === undefined) return `${defaultApi}/articles${page}`;
  return `${defaultApi}/articles${page}`;
};

export const SHOW_ARTICLE_API = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;

export const CREATE_ARTICLE_API = `${defaultApi}/articles`;

export const EDIT_ARTICLE_API = (articleId: string) =>
  `${defaultApi}/articles/${articleId}`;

export const SEARCH_ARTICLE_API = (querry: string) =>
  `${defaultApi}/articles/search${querry}`;

// comments_controller
export const INDEX_COMMENTS_API = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}/comments`;

// users_controller
export const USERS_API = `${defaultApi}/users`;
export const SHOW_USERS_API = (uid?: string) => `${USERS_API}/${uid}`;
export const USERS_AVATAR_API = (uid: string) =>
  `${defaultApi}/users/${uid}/avatar`;

// favorites_controller
export const FAVORITES_API = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}/favorites`;

// tags
export const TAGS_API = `${defaultApi}/tags`;

// tagmap
export const TAGMAPS_API = (articleId: string) =>
  `${defaultApi}/articles/${articleId}/tagmaps`;
