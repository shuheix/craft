import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articleType";

export const useArticleApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const fetchArticleApi = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<{ articles: ArticleType[] }>(url)
      .then((res) => {
        setLoading(false);
        const articleData = res.data.articles;
        setArticles(articleData);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return { loading, error, articles, fetchArticleApi };
};
