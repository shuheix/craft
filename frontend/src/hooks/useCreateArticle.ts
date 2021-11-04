import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CREATE_ARTICLE_API } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useCreateArticle = () => {
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();
  const toast = useToast();

  const postArticle = (title: string, text: string, image: File[]) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      console.log(token);
      axios({
        url: CREATE_ARTICLE_API,
        method: "POST",
        headers: {
          Authorization: token,
        },
        data: formData,
      })
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
