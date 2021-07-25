import { Box } from "@chakra-ui/react";
import React, { VFC } from "react";
import ShowArticleLayout from "../layouts/ShowArticleLayout";

const ArticlePage: VFC = () => {
  return (
    <Box bgColor="teal.50">
      <ShowArticleLayout />
    </Box>
  );
};

export default ArticlePage;