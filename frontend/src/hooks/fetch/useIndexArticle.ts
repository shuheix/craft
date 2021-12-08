import axios from "axios";
import useSWR from "swr";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { ArticleApiType } from "../../types/apiType";

export const useIndexArticle = (query?: string) => {
  const { data, error } = useSWR(INDEX_ARTICLES_API(query), (url: string) =>
    axios.get<{ articles: ArticleApiType[] }>(url).then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
