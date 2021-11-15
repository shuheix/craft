import React, { VFC } from "react";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
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
                <HStack h="100%">
                  <Avatar ml={4} src={article.avatar} />
                  <VStack>
                    <Box>{article.title}</Box>
                    <Box>{article.avatar}</Box>
                  </VStack>
                </HStack>
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
