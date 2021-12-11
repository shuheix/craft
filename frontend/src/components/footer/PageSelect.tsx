import { Flex, Button } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useLocation } from "react-router-dom";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import { usePageSelect } from "../../hooks/usePageSelect";

const PageSelect: VFC = () => {
  const location = useLocation();
  const { data } = useIndexArticle(location.search);
  const { nextPage, backPage, currentPage } = usePageSelect();
  if (data?.articles.length != null && data.articles.length <= 12) return null;
  return (
    <>
      <Flex justifyContent="flex-end" mt={4}>
        {currentPage !== 1 && (
          <Button bgColor="gray.100" onClick={backPage}>
            戻る
          </Button>
        )}
        {currentPage !== data?.articles.length && (
          <Button ml={4} onClick={nextPage}>
            次のページへ
          </Button>
        )}
      </Flex>
    </>
  );
};

export default PageSelect;
