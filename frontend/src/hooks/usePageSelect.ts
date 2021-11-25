import { useState } from "react";
import { useHistory } from "react-router-dom";
import { INDEX_ARTICLE_PAGE_URL } from "../constant/appHistory";

export const usePageSelect = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const history = useHistory();

  const handlePage = () => {
    if (currentPage !== undefined) {
      const page = currentPage.toString();
      history.push(INDEX_ARTICLE_PAGE_URL(page));
    }
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    handlePage();
  };

  const backPage = () => {
    setCurrentPage((prev) => prev - 1);
    handlePage();
  };

  return { nextPage, backPage, currentPage };
};
