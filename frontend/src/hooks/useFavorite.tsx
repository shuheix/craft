import axios from "axios";
import { FAVORITES_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import { useSingleArticle } from "./fetch/useSingleArticle";

export const useFavorite = (articleId: string) => {
  const { mutate } = useSingleArticle(articleId);

  const createFavorite = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(FAVORITES_API(articleId), {
          headers: { Authorization: token },
          article_id: articleId,
          uid: auth.currentUser?.uid,
        })
        .then(() => mutate());
    });
  };

  const destroyFavorite = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        url: FAVORITES_API(articleId),
        data: { id: `${articleId}`, headers: { Authorization: token } },
      }).then(() => mutate());
    });
  };

  return { createFavorite, destroyFavorite };
};
