import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ArticleType } from "../types/articleType";

export const useCreateArticle = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const history = useHistory();

  const handleTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const postArticle = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post<{ articles: ArticleType }>(
          "http://localhost:3000/api/v1/articles",
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
  };
  return { title, text, handleTitleValue, handleTextareaValue, postArticle };
};