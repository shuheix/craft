import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useEffect } from "react";
import { rootUrl } from "../../constant/railsRoute";
import { useArticleApi } from "../../hooks/useArticleApi";
import ArticleCard from "../articles/ArticleCard";

const HomePage: VFC = () => {
  const { loading, articles, fetchArticleApi } = useArticleApi();

  useEffect(() => {
    fetchArticleApi(rootUrl);
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
            <WrapItem key={article.id}>
              <ArticleCard
                id={article.id}
                title={article.title}
                text={article.text}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default HomePage;
