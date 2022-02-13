import axios from "axios";
import useSWR from "swr";
import { SHOW_USERS_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";
import { CommentType } from "../../types/commentType";
import { UserType } from "../../types/userType";

export const useUser = (uid?: string) => {
  const { data, error, mutate } = useSWR(SHOW_USERS_API(uid), (url: string) =>
    axios
      .get<{
        user: UserType & { articles: ArticleType[] } & {
          favorite_articles: ArticleType[];
        } & { comments: CommentType[] };
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
