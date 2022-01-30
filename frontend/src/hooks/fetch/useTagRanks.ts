import axios from "axios";
import useSWR from "swr";
import { TAGS_API } from "../../constant/railsRoute";
import { TagType } from "../../types/tagType";

const useTagRanks = () => {
  const { data, error } = useSWR(TAGS_API, (url: string) =>
    axios.get<{ tags: TagType[] }>(url).then((res) => res.data)
  );
  return { data, isLoading: !error && !data, isError: error };
};

export default useTagRanks;
