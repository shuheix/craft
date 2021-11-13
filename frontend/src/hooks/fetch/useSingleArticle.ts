import axios from "axios";
import useSWR from "swr";
import { SHOW_ARTICLE_API } from "../../constant/railsRoute";
import { ArticleApiType } from "../../types/apiType";

export const useSingleArticle = (articleId: string) => {
  const { data, error, mutate } = useSWR(
    SHOW_ARTICLE_API(articleId),
    (url: string) =>
      axios.get<ArticleApiType | null | undefined>(url).then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
