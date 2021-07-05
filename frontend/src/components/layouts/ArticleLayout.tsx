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
    <Container>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Heading border="solid" borderRadius="full">
            {articleTitle}
          </Heading>
          <Text>{articleText}</Text>
        </Box>
      )}
    </Container>
  );
};

export default ArticleLayout;
