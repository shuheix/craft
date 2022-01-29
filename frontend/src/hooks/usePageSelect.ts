import { useHistory } from "react-router-dom";
import { INDEX_ARTICLE_PAGE_URL } from "../constant/appHistory";
import { useIndexArticle } from "./fetch/useIndexArticle";

export const usePageSelect = () => {
  const history = useHistory();
  const { data } = useIndexArticle();
  const nextPage = () => {
    if (data?.meta.next_page != null) {
      const page = data?.meta.next_page.toString();
      history.push(INDEX_ARTICLE_PAGE_URL(page));
    }
  };

  const prevPage = () => {
    if (data?.meta.prev_page != null) {
      const page = data?.meta.prev_page.toString();
      history.push(INDEX_ARTICLE_PAGE_URL(page));
    }
  };

  return { nextPage, prevPage };
};
