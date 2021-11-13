import {
  Container,
  Flex,
  Box,
  Spinner,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSearchArticle } from "../../hooks/fetch/useSearchArticle";
import ArticleCard from "../article/ArticleCard";
import LeftAside from "../aside/LeftAside";
import Header from "../header/Header";

const SearchArticlePage = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, isError, isLoading } = useSearchArticle(location.search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log("data:", data);

  if (isError) return <p>error!</p>;
  if (isLoading) return <p>loading!</p>;
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Flex>
          <LeftAside />
          {isLoading ? (
            <Box>
              <Spinner />
            </Box>
          ) : (
            <Flex flexDirection="column" ml={10}>
              <Box>
                <Wrap flex={1} justify="flex-end" spacing="30px">
                  {data?.articles.map((article) => (
                    <WrapItem
                      key={article.id}
                      onClick={() => history.push(`/articles/${article.id}`)}
                      _hover={{
                        boxShadow: "xl",
                        cursor: "pointer",
                      }}
                    >
                      <ArticleCard
                        title={article.title}
                        username={article.user_name}
                        createdAt={article.created_at}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
              <Flex justifyContent="flex-end" mt={4}>
                {currentPage !== 1 && (
                  <Button
                    bgColor="gray.100"
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      history.push(`/articles?page=${currentPage}`);
                    }}
                  >
                    戻る
                  </Button>
                )}
                {currentPage !== data?.total_pages && (
                  <Button
                    ml={4}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      history.push(`/articles?page=${currentPage}`);
                    }}
                  >
                    次のページへ
                  </Button>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default SearchArticlePage;
