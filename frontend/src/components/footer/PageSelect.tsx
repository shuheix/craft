import { Flex, Button } from "@chakra-ui/react";
import React, { VFC } from "react";
import { usePageSelect } from "../../hooks/usePageSelect";
import { ArticleType } from "../../types/articleType";

type Props = {
  data:
    | {
        articles: ArticleType[];
        total_pages: number;
      }
    | undefined;
};

const PageSelect: VFC<Props> = (props) => {
  const { data } = props;
  const { nextPage, backPage, currentPage } = usePageSelect();
  return (
    <>
      <Flex justifyContent="flex-end" mt={4}>
        {currentPage !== 1 && (
          <Button bgColor="gray.100" onClick={backPage}>
            戻る
          </Button>
        )}
        {currentPage !== data?.total_pages && (
          <Button ml={4} onClick={nextPage}>
            次のページへ
          </Button>
        )}
      </Flex>
    </>
  );
};

export default PageSelect;
