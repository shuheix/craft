import axios from "axios";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articleType";
import { UserType } from "../types/userType";

export const useFetchSingleArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");

  const fetchSingleArticle = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<{
        articles: ArticleType & { user: UserType };
      }>(url)
      .then((res) => {
        setText(res.data.articles.text);
        setTitle(res.data.articles.title);
        setUid(res.data.articles.user.uid);
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
    text,
    title,
    uid,
    setText,
    setTitle,
    fetchSingleArticle,
  };
};
