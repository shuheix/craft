import axios from "axios";
import useSWR from "swr";
import { INDEX_COMMENTS_API } from "../constant/railsRoute";
import { CommentType } from "../types/commentType";

export const useComment = (articleId: string) => {
  const { data, error, mutate } = useSWR(
    INDEX_COMMENTS_API(articleId),
    (url: string) =>
      axios.get<{ comments: CommentType[] } | null>(url).then((res) => res.data)
  );

  return {
    comments: data?.comments,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
