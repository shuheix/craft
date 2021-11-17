import React, { VFC } from "react";
import {
  Avatar,
  Box,
  Container,
  Heading,
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
import dayjs from "dayjs";
import { CalendarIcon } from "@chakra-ui/icons";

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
      <Container maxW="container.xl">
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
              <HStack h="100%">
                <Avatar ml={4} src={article.avatar} />
                <VStack spacing={2} flexGrow={1}>
                  <Heading size="sm" maxWidth="100%">
                    {article.title}
                  </Heading>
                  <Box>
                    <CalendarIcon mr={2} />
                    {dayjs(article.created_at).format("YYYY年MM月DD日")}
                  </Box>
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

export default IndexArticlePage;
