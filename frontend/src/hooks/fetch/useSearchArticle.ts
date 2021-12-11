import axios from "axios";
import useSWR from "swr";
import { SEARCH_ARTICLE_API } from "../../constant/railsRoute";
import { ArticleApiType } from "../../types/apiType";

export const useSearchArticle = (querry: string) => {
  const { data, error } = useSWR(SEARCH_ARTICLE_API(querry), (url: string) =>
    axios
      .get<{ articles: ArticleApiType[]; total_pages: number }>(url)
      .then((res) => res.data)
  );

  return { data, isLoading: !error && !data, isError: error };
};
