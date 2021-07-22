import axios from "axios";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ArticleType } from "../types/articleType";
import { useFetchSingleArticle } from "./useFetchSingleArticle";

export const useUpdateArticle = () => {
  const {
    text,
    title,
    loading,
    error,
    setTitle,
    setText,
    fetchSingleArticle,
  } = useFetchSingleArticle();

  const history = useHistory();

  const handleTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const postArticle = useCallback(
    (articleId) => {
      auth.currentUser?.getIdToken(true).then((token) => {
        axios
          .patch<{ articles: ArticleType }>(
            `http://localhost:3000/api/v1/articles/${articleId}`,
            {
              headers: { Authorization: token },
              title: title,
              text: text,
            }
          )
          .then((res) => {
            history.push(`/articles/${res.data.articles.id}`);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    [history, text, title]
  );
  return {
    title,
    text,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
    loading,
    error,
    fetchSingleArticle,
  };
};
