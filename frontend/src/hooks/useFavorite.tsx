import axios from "axios";
import { SHOW_ARTICLE_URL } from "../constant/appHistory";
import { FAVORITES_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import useSWR from "swr";
import { ArticleApiType } from "../types/apiType";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

export const useFavorite = (articleId: string) => {
  const { currentUser } = useContext(AuthContext);
  const { mutate } = useSWR(SHOW_ARTICLE_URL(articleId));

  const isFavorite = (data: ArticleApiType) => {
    // data.find((item)=>item.articles.favorites)
    if (data.articles.favorites.find((item) => item.uid === currentUser?.uid))
      return true;
  };

  const createFavorite = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(FAVORITES_API(articleId), {
          headers: { Authorization: token },
          article_id: articleId,
          uid: auth.currentUser?.uid,
        })
        .then(() => {
          mutate();
        });
    });
  };

  const destroyFavorite = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        url: FAVORITES_API(articleId),
        data: { id: `${articleId}`, headers: { Authorization: token } },
      }).then(() => {
        mutate();
      });
    });
  };

  return { createFavorite, destroyFavorite, isFavorite };
};
