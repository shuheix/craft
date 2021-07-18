import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { useArticleApi } from "../../hooks/useArticleApi";
import { articleApi } from "../../constant/railsRoute";
import { Box, Container, Input, Spinner, Textarea } from "@chakra-ui/react";

const EditArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useArticleApi();

  const articleTitle = articles.map((article) => article.title);
  const articleText = articles.map((article) => article.text);

  useEffect(() => {
    fetchArticleApi(articleApi(articleId));
  }, [fetchArticleApi, articleId]);

  if (error) return <div>Error!</div>;
  return (
    <Container px={0} py={20}>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Input value={articleTitle} minH="50px" mb={5} />
          <Textarea value={articleText} rows={25} />
        </Box>
      )}
    </Container>
  );
};

export default EditArticleLayout;
