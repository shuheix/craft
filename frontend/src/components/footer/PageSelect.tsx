import { Flex, Button } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import { usePageSelect } from "../../hooks/usePageSelect";

const PageSelect: VFC = () => {
  const { data } = useIndexArticle();
  const { nextPage, prevPage } = usePageSelect();
  return (
    <>
      <Flex justifyContent="flex-end" mt={4} pb={10}>
        {data?.meta.current_page !== 1 && (
          <Button onClick={prevPage} variant="solid" colorScheme="green">
            戻る
          </Button>
        )}
        {data?.meta.current_page !== data?.meta.total_pages && (
          <Button ml={4} onClick={nextPage} variant="solid" colorScheme="green">
            次のページへ
          </Button>
        )}
      </Flex>
    </>
  );
};

export default PageSelect;
