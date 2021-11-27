import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SHOW_ARTICLE_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import { useSingleArticle } from "./fetch/useSingleArticle";

export const useArticleFunction = () => {
  const history = useHistory();
  const toast = useToast();
  const { articleId } = useParams<{ articleId: string }>();
  const { data } = useSingleArticle();

  const onClickDestroyButton = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        headers: { Authorization: token },
        url: `${SHOW_ARTICLE_API(`${articleId}`)}`,
        data: { id: `${articleId}` },
      })
        .then(() => {
          history.push(`/users/${data?.articles.user_id}`);
          toast({
            title: "削除しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "エラー",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };

  const onClickEditButton = () => {
    history.push(`/articles/${articleId}/edit`);
  };

  return { onClickDestroyButton, onClickEditButton };
};
