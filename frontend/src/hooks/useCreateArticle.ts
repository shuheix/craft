import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ArticleType } from "../types/articleType";

export const useCreateArticle = () => {
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();
  const toast = useToast();

  const postArticle = (title: string, text: string) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      setLoading(true);
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
          setLoading(false);
          history.push(`/articles/${res.data.articles.id}`);
          toast({
            title: "投稿しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          setLoading(false);
          toast({
            title: "投稿に失敗しました",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };
  return { loading, postArticle };
};
