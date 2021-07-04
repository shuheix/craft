import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { useArticleApi } from "../../hooks/useArticleApi";
import { articleApi } from "../../constant/railsRoute";
import { Box, Spinner, Text, Textarea } from "@chakra-ui/react";

const ArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { loading, error, articles, fetchArticleApi } = useArticleApi();

  useEffect(() => {
    fetchArticleApi(articleApi(articleId));
  }, [fetchArticleApi, articleId]);

  if (error) return <div>Error!</div>;
  return (
    <>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Text></Text>
          <Textarea>test</Textarea>
        </Box>
      )}
    </>
  );
};

export default ArticleLayout;
