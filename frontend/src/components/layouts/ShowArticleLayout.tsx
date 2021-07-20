import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { articleApi } from "../../constant/railsRoute";
import { Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { useIndexArticle } from "../../hooks/useIndexArticle";

const ShowArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useIndexArticle();

  const articleTitle = articles.map((article) => article.title);
  const articleText = articles.map((article) => article.text);

  useEffect(() => {
    fetchArticleApi(articleApi(articleId));
  }, [fetchArticleApi, articleId]);

  if (error) return <p>error!</p>;

  return (
    <Container px={0} py={20}>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box
          bgColor="white"
          boxShadow="xl"
          borderRadius="2xl"
          border="1px"
          borderColor="gray.100"
        >
          <Heading height="20vh" borderTopRadius="xl">
            {articleTitle}
          </Heading>
          <Text minHeight="60vh" borderBottomRadius="xl">
            {articleText}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default ShowArticleLayout;
