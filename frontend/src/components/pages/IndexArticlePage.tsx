import React, { VFC } from "react";
import { Box, Container, HStack, Spinner } from "@chakra-ui/react";
import Header from "../header/Header";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import PageSelect from "../footer/PageSelect";
import TagRanks from "../article/tag/TagRanks";
import ArticleList from "../article/list/ArticleList";

const IndexArticlePage: VFC = () => {
  const { data, isError, isLoading } = useIndexArticle();

  if (isError) return <p>error!</p>;
  if (isLoading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box bgColor="teal.50" minH="100vh">
      <Header />
      <Container maxW="container.xl">
        <HStack mt={20}>
          <Box w="100%" mr={10}>
            <ArticleList />
            <PageSelect data={data} />
          </Box>
          <TagRanks />
        </HStack>
      </Container>
    </Box>
  );
};

export default IndexArticlePage;
