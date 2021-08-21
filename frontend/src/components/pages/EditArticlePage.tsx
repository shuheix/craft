import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import {
  Container,
  Box,
  Spinner,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useUpdateArticle } from "../../hooks/useUpdateArticle";
import Header from "../header/Header";

const EditArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    title,
    text,
    loading,
    error,
    handleTextareaValue,
    handleTitleValue,
    fetchSingleArticle,
    postArticle,
  } = useUpdateArticle();

  useEffect(() => {
    fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <div>Error!</div>;
  return (
    <>
      <Header />
      <Container px={0} py={20} maxW="container.lg">
        {loading ? (
          <Box>
            <Spinner />
          </Box>
        ) : (
          <Box>
            <Input
              value={title}
              onChange={handleTitleValue}
              minH="50px"
              mb={5}
            />
            <Textarea
              defaultValue={text}
              onChange={handleTextareaValue}
              rows={25}
            />
            <Button onClick={() => postArticle(articleId)}>投稿</Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default EditArticleLayout;
