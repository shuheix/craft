export const defaultApi = "http://localhost:3000/api/v1";

// Application Root
export const rootApi = `${defaultApi}/articles`;

// article controller
export const articleApi = (articleId: string): string =>
  `${defaultApi}/articles/${articleId}`;

export const indexURI = "/articles";

// rails_users_controller

export const USERS_URI = `${defaultApi}/users`;

// useHistory
