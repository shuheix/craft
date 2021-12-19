import axios from "axios";
import { useContext } from "react";
import useSWR from "swr";
import { SHOW_USERS_API } from "../../constant/railsRoute";
import { AuthContext } from "../../providers/AuthProvider";
import { ArticleType } from "../../types/articleType";
import { UserType } from "../../types/userType";

export const useUser = () => {
  const { currentUser } = useContext(AuthContext);

  const { data, error, mutate } = useSWR(
    currentUser ? SHOW_USERS_API(currentUser.uid) : null,
    (url: string) =>
      axios
        .get<{
          articles: ArticleType[];
          user: UserType;
          favorite_articles: ArticleType[];
        }>(url)
        .then((res) => res.data)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    currentUser,
  };
};
