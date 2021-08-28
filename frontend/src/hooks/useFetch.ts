import axios from "axios";
import useSWR from "swr";
import { ArticleApiType } from "../types/apiType";

export const useFetch = (url: string) => {
  const fetcher = (url: string) => {
    axios.get<ArticleApiType>(url);
  };
  const { data, error } = useSWR(url, fetcher);

  return { data, isLoading: !error && !data, isError: error };
};
