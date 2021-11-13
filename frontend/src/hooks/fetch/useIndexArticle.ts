import axios from "axios";
import useSWR from "swr";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";

export const useIndexArticle = (query?: string) => {
  const { data, error } = useSWR(INDEX_ARTICLES_API(query), (url: string) =>
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
