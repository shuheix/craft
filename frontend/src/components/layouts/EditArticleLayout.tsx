import { Box, Container, Input, Spinner, Textarea } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { articleApi } from "../../constant/railsRoute";
import { useArticleApi } from "../../hooks/useArticleApi";

const EditArticleLayout = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useArticleApi();

  const articleTitle = articles.map((article) => article.title);
  const articleText = articles.map((article) => article.text);

  useEffect(() => {
    fetchArticleApi(articleApi(articleId));
  }, [fetchArticleApi, articleId]);

  if (error) return <div>Error!</div>;
  return (
    <div>
      <Container px={0} py={20} maxW="container.md">
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
            <Input value={articleTitle} />
            <Textarea value={articleText} />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default EditArticleLayout;
