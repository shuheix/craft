import axios from "axios";
import useSWR from "swr";
import { SHOW_USERS_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";
import { UserType } from "../../types/userType";

export const useUser = (uid: string) => {
  const { data, error, mutate } = useSWR(SHOW_USERS_API(uid), (url: string) =>
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
  };
};
