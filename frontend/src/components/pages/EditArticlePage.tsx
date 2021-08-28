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
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";

const EditArticleLayout: VFC = () => {
  const { fetchSingleArticle, loading, error, data } = useFetchSingleArticle();
  const { articleId } = useParams<{ articleId: string }>();
  const {
    handleTextareaValue,
    handleTitleValue,
    postArticle,
  } = useUpdateArticle({
    title: data?.articles.title,
    text: data?.articles.text,
  });

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
              defaultValue={data?.articles.title}
              onChange={handleTitleValue}
              minH="50px"
              mb={5}
            />
            <Textarea
              defaultValue={data?.articles.text}
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
