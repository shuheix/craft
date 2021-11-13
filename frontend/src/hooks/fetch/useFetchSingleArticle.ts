import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleApiType } from "../../types/apiType";

export const useFetchSingleArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<ArticleApiType | null>(null);

  const fetchSingleArticle = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<ArticleApiType | null>(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return {
    loading,
    error,
    data,
    fetchSingleArticle,
  };
};
