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
import { useUpdateArticle } from "../../hooks/useUpdateArticle";

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
    fetchSingleArticle(articleApi(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <div>Error!</div>;
  return (
    <Container px={0} py={20}>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Input value={title} onChange={handleTitleValue} minH="50px" mb={5} />
          <Textarea
            defaultValue={text}
            onChange={handleTextareaValue}
            rows={25}
          />
          <Button onClick={() => postArticle(articleId)}>投稿</Button>
        </Box>
      )}
    </Container>
  );
};

export default EditArticleLayout;
