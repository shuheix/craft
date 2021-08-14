import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ArticleType } from "../types/articleType";

export const useCreateArticle = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const history = useHistory();
  const toast = useToast();

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
          toast({
            title: "投稿しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "投稿に失敗しました",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };
  return { title, text, handleTitleValue, handleTextareaValue, postArticle };
};
