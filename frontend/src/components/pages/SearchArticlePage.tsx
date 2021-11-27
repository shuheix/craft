import {
  Container,
  Box,
  Spinner,
  Avatar,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { VFC } from "react";
import { useLocation } from "react-router-dom";
import { useSearchArticle } from "../../hooks/fetch/useSearchArticle";
import { useAppHistory } from "../../hooks/useAppHistory";
import PageSelect from "../footer/PageSelect";
import Header from "../header/Header";

const SearchArticlePage: VFC = () => {
  const location = useLocation();
  const { data, isError, isLoading } = useSearchArticle(location.search);
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
      <Box>
        <Header />
      </Box>
      <Container maxW="container.xl" flex={1}>
        <SimpleGrid columns={{ md: 2 }} spacingX="40px" spacingY="20px" mt={20}>
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
              <HStack h="100%" px={4}>
                <Avatar src={article.avatar} />
                <VStack spacing={2} flexGrow={1}>
                  <Heading size="sm" maxWidth="100%" alignSelf="flex-start">
                    {article.title}
                  </Heading>
                  <Heading size="xs" alignSelf="flex-end" mr={4}>
                    {dayjs(article.created_at).format("YYYY年MM月DD日")}
                  </Heading>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
        <PageSelect data={data} />
      </Container>
    </Box>
  );
};

export default SearchArticlePage;
