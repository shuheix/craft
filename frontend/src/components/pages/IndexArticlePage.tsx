import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { rootApi } from "../../constant/railsRoute";
import { useIndexArticle } from "../../hooks/useIndexArticle";
import ArticleCard from "../article/ArticleCard";

const IndexArticlePage: VFC = () => {
  const { loading, articles, fetchArticleApi } = useIndexArticle();
  const history = useHistory();

  useEffect(() => {
    fetchArticleApi(rootApi);
  }, [fetchArticleApi]);

  return (
    <>
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Wrap flex={1} justify="center">
          {articles.map((article) => (
            <WrapItem
              key={article.id}
              onClick={() => history.push(`/article/${article.id}`)}
              _hover={{
                boxShadow: "xl",
                cursor: "pointer",
              }}
            >
              <ArticleCard title={article.title} />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default IndexArticlePage;
