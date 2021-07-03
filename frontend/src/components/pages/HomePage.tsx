import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useEffect } from "react";
import { rootApi } from "../../constant/railsRoute";
import { useArticleApi } from "../../hooks/useArticleApi";
import { usePageTransition } from "../../hooks/usePageTransition";
import ArticleCard from "../article/ArticleCard";

const HomePage: VFC = () => {
  const { loading, articles, fetchArticleApi } = useArticleApi();
  const { pageTransition } = usePageTransition();

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
              onClick={() => pageTransition(`/article/${article.id}`)}
            >
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
