import React, { VFC } from "react";
import {
  Box,
  Container,
  Flex,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import ArticleCard from "../article/ArticleCard";
import Header from "../header/Header";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import PageSelect from "../footer/PageSelect";

const IndexArticlePage: VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, isError, isLoading } = useIndexArticle(location.search);

  if (isError) return <p>error!</p>;
  if (isLoading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Flex>
          <Flex flexDirection="column" ml={10}>
            <>
              <Wrap flex={1} justify="flex-end" spacing="30px">
                {data &&
                  data.articles.map((article) => (
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
            </>
          </Flex>
        </Flex>
        <PageSelect data={data} />
      </Container>
    </>
  );
};

export default IndexArticlePage;
