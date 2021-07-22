import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { articleApi } from "../../constant/railsRoute";
import { Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";

const ShowArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    title,
    text,
    loading,
    error,
    fetchSingleArticle,
  } = useFetchSingleArticle();

  useEffect(() => {
    fetchSingleArticle(articleApi(articleId));
  }, [articleId, fetchSingleArticle]);

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
            {title}
          </Heading>
          <Text minHeight="60vh" borderBottomRadius="xl">
            {text}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default ShowArticleLayout;
