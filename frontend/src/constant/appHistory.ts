/* Usage
|  cost history = useHistory();
|  histpry.push(INDEX_ARTICLE_URI)
*/
export const HOME_URL = "/";
export const INDEX_ARTICLE_URL = "/articles";
export const INDEX_ARTICLE_PAGE_URL = (page: string) =>
  `/articles?page=${page}`;
export const NEW_ARTICLE_URL = "/articles/new";
export const SHOW_ARTICLE_URL = (articleId: string) => `/articles/${articleId}`;
export const SHOW_USER_URL = (usersId: string) => `/users/${usersId}`;
