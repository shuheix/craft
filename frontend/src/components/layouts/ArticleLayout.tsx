import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { useArticleApi } from "../../hooks/useArticleApi";
import { articleApi } from "../../constant/railsRoute";
import { Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";

const ArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useArticleApi();

  const articleTitle = articles.map((article) => article.id);
  const articleText = articles.map((article) => article.text);

  useEffect(() => {
    fetchArticleApi(articleApi(articleId));
  }, [fetchArticleApi, articleId]);

  if (error) return <div>Error!</div>;
  return (
    <Container maxW="container.lg">
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Heading border="solid" height="20vh">
            {articleTitle}
          </Heading>
          <Text border="solid" height="100vh">
            {articleText}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default ArticleLayout;
