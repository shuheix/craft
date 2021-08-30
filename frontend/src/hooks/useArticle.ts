import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SINGLE_ARTICLE_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import { ArticleApiType } from "../types/apiType";

export const useArticle = (articleId: string, data: ArticleApiType | null) => {
  const history = useHistory();
  const toast = useToast();
  const onClickDestroyButton = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        url: `${SINGLE_ARTICLE_API(`${articleId}`)}`,
        data: { id: `${articleId}`, headers: { Authorization: token } },
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
  const onClickEditButton = (): void => {
    history.push(`/articles/${articleId}/edit`);
  };
  return { onClickDestroyButton, onClickEditButton };
};
