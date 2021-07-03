import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const usePageTransition = () => {
  const history = useHistory();

  const pageTransition = useCallback(
    (link: string) => {
      history.push(link);
    },
    [history]
  );

  return { pageTransition };
};
