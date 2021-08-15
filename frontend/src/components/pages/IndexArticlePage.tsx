import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { INDEX_ARTICLES_API } from "../../constant/railsRoute";
import { useIndexArticle } from "../../hooks/useIndexArticle";
import ArticleCard from "../article/ArticleCard";

const IndexArticlePage: VFC = () => {
  const { loading, articles, fetchArticleApi } = useIndexArticle();
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    fetchArticleApi(INDEX_ARTICLES_API(location.search));
  }, [fetchArticleApi, location.key, location.pathname, location.search]);

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
              onClick={() => history.push(`/articles/${article.id}`)}
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
