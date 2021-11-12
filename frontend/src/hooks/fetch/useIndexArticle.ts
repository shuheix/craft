import axios from "axios";
// import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";
// import { ArticleType } from "../../types/articleType";

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
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  // const [articles, setArticles] = useState<ArticleType[]>([]);
  // const [totalPage, setTotalPages] = useState<number>();

  // const fetchArticleApi = useCallback((url: string) => {
  //   setLoading(true);
  //   axios
  //     .get<{ articles: ArticleType[]; total_pages: number }>(url)
  //     .then((res) => {
  //       setLoading(false);
  //       setArticles(res.data.articles);
  //       setTotalPages(res.data.total_pages);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       setError(true);
  //     });
  // }, []);
  // return { loading, error, articles, fetchArticleApi, totalPage };
};
