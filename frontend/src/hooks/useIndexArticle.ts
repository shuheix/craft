import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articleType";

export const useIndexArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [totalPage, setTotalPages] = useState<number>();

  const fetchArticleApi = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<{ articles: ArticleType[]; total_pages: number }>(url)
      .then((res) => {
        setLoading(false);
        setArticles(res.data.articles);
        setTotalPages(res.data.total_pages);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return { loading, error, articles, fetchArticleApi, totalPage };
};
