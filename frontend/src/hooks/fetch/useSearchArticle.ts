import axios from "axios";
import useSWR from "swr";
import { SEARCH_ARTICLE_API } from "../../constant/railsRoute";
import { ArticleApiType } from "../../types/apiType";
import { PaginationType } from "../../types/paginationType";

export const useSearchArticle = (querry: string) => {
  const { data, error } = useSWR(SEARCH_ARTICLE_API(querry), (url: string) =>
    axios
      .get<{ articles: ArticleApiType[]; meta: PaginationType }>(url)
      .then((res) => res.data)
  );

  return { data, isLoading: !error && !data, isError: error };
};
