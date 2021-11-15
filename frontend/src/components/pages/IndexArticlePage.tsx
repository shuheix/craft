import React, { VFC } from "react";
import { Box, Container, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import PageSelect from "../footer/PageSelect";
import { useAppHistory } from "../../hooks/useAppHistory";

const IndexArticlePage: VFC = () => {
  const location = useLocation();
  const { data, isError, isLoading } = useIndexArticle(location.search);
  const { goShowArticlePage } = useAppHistory();

  if (isError) return <p>error!</p>;
  if (isLoading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box bgColor="teal.50" minH="100vh">
      <Header />
      <Flex>
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ md: 2 }}
            spacingX="40px"
            spacingY="20px"
            mt={20}
          >
            {data?.articles.map((article) => (
              <Box
                key={article.id}
                onClick={() => goShowArticlePage(article.id)}
                boxShadow="md"
                _hover={{
                  cursor: "pointer",
                  boxShadow: "xl",
                }}
                height="100px"
                bgColor="white"
                borderRadius="xl"
              >
                {article.title}
              </Box>
            ))}
          </SimpleGrid>
          <PageSelect data={data} />
        </Container>
      </Flex>
    </Box>
  );
};

export default IndexArticlePage;
