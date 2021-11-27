import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SHOW_ARTICLE_API } from "../../constant/railsRoute";
import { ArticleApiType } from "../../types/apiType";

export const useSingleArticle = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { data, error, mutate } = useSWR(
    SHOW_ARTICLE_API(articleId),
    (url: string) => axios.get<ArticleApiType>(url).then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
