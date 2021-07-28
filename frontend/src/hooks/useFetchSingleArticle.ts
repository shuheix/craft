import axios from "axios";
import { useCallback, useState } from "react";
import { SingleArticleApi } from "../types/apiType";

export const useFetchSingleArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");

  const fetchSingleArticle = useCallback((url: string) => {
    setLoading(true);
    axios
      .get<SingleArticleApi>(url)
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
