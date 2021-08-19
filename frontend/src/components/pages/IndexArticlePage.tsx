import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { useIndexArticle } from "../../hooks/useIndexArticle";
import ArticleCard from "../article/ArticleCard";
import LeftAside from "../aside/LeftAside";

const IndexArticlePage: VFC = () => {
  const { loading, articles, fetchArticleApi } = useIndexArticle();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchArticleApi(INDEX_ARTICLES_API(location.search));
  }, [fetchArticleApi, location.key, location.pathname, location.search]);

  return (
    <>
      <Container maxW="container.xl">
        <Flex>
          <LeftAside />
          {loading ? (
            <Box>
              <Spinner />
            </Box>
          ) : (
            <Flex flexDirection="column" ml={10}>
              <Box>
                <Wrap flex={1} justify="flex-end" spacing="30px">
                  {articles.map((article) => (
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
                <Button bgColor="gray.100">前のページへ</Button>
                <Button ml={4}>次のページへ</Button>
              </Flex>
            </Flex>
          )}
          {/* <RightAside /> */}
        </Flex>
      </Container>
    </>
  );
};

export default IndexArticlePage;
