import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articleType";

export const useFetchSingleArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const fetchSingleArticle = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<{ articles: ArticleType }>(url)
      .then((res) => {
        setText(res.data.articles.title);
        setTitle(res.data.articles.text);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return { loading, error, text, title, setText, setTitle, fetchSingleArticle };
};
