import axios from "axios";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";

export const useIndexArticle = () => {
  const location = useLocation();
  const { data, error } = useSWR(
    INDEX_ARTICLES_API(location.search),
    (url: string) =>
      axios
        .get<{ articles: ArticleType[]; total_pages: number }>(url)
        .then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
