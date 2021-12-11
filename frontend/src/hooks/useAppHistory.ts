import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  HOME_URL,
  NEW_ARTICLE_URL,
  SHOW_ARTICLE_URL,
} from "../constant/appHistory";
import { AuthContext } from "../providers/AuthProvider";

export const useAppHistory = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const goHomePage = () => {
    history.push(HOME_URL);
  };

  const goEditPage = () => {
    history.push(NEW_ARTICLE_URL);
  };

  const goUserPage = () => {
    const uid = currentUser?.uid;
    history.push(`/users/${uid}`);
  };

  const goShowArticlePage = (articleId: string) => {
    history.push(SHOW_ARTICLE_URL(articleId));
  };
  return { goHomePage, goEditPage, goUserPage, goShowArticlePage };
};
