import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { articleApi } from "../../constant/railsRoute";
import {
  Container,
  Box,
  Spinner,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useIndexArticle } from "../../hooks/useIndexArticle";

const EditArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useIndexArticle();

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
          <Input defaultValue={articleTitle} minH="50px" mb={5} />
          <Textarea defaultValue={articleText} rows={25} />
          <Button>投稿</Button>
        </Box>
      )}
    </Container>
  );
};

export default EditArticleLayout;
