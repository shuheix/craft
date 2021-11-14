import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { INDEX_ARTICLE_URL, NEW_ARTICLE_URL } from "../constant/appHistory";
import { AuthContext } from "../providers/AuthProvider";

export const useAppHistory = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const goHomePage = () => {
    history.push(INDEX_ARTICLE_URL);
  };

  const goEditPage = () => {
    history.push(NEW_ARTICLE_URL);
  };

  const goUserPage = () => {
    const uid = currentUser?.uid;
    history.push(`/users/${uid}`);
  };
  return { goHomePage, goEditPage, goUserPage };
};
