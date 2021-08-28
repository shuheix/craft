import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

type postType = {
  title: string | null;
  text: string | null;
};

export const useUpdateArticle = () => {
  const [postData, setPostData] = useState<postType>({
    title: null,
    text: null,
  });
  const history = useHistory();
  const toast = useToast();

  const handleTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, title: event.target.value });
  };

  const handleTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostData({ ...postData, text: event.target.value });
  };

  const postArticle = useCallback(
    (articleId) => {
      auth.currentUser?.getIdToken(true).then((token) => {
        axios
          .patch(`http://localhost:3000/api/v1/articles/${articleId}`, {
            headers: { Authorization: token },
            title: postData.title,
            text: postData.text,
          })
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
    },
    [history, postData.text, postData.title, toast]
  );
  return {
    postData,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
  };
};
