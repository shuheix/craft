import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ArticleType } from "../types/articleType";

export const useHandleArticle = () => {
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
          history.push(`/article/${res.data.articles.id}`);
          console.log(res.data.articles.id);
        });
    });
  };
  return { title, text, handleTitleValue, handleTextareaValue, postArticle };
};
