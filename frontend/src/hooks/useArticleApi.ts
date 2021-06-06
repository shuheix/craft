import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleApiType, ArticleType } from "../types/articleType";

export const useArticleApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const fetchAllArticle = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<ArticleApiType>(url)
      .then((res) => {
        setLoading(false);
        const articles = res.data.articles;
        setArticles(articles);
      })
      .catch(() => alert("取得に失敗しました"));
    setLoading(false);
  }, []);

  return { loading, articles, fetchAllArticle };
};
