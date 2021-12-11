import { CalendarIcon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  Spinner,
  Avatar,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Icon,
  Tag,
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
              <HStack h="100%" px={4}>
                <Avatar src={article.avatar} />
                <VStack spacing={2} flexGrow={1}>
                  <Heading size="xs" alignSelf="flex-start" mr={4}>
                    <Icon as={CalendarIcon} mr={1} />
                    {dayjs(article.created_at).format("YYYY年MM月DD日")}
                  </Heading>
                  <Heading
                    size="sm"
                    maxWidth="100%"
                    alignSelf="flex-start"
                    ml={4}
                  >
                    {article.title}
                  </Heading>
                  <HStack alignSelf="flex-end" pl={3}>
                    {article.tags.map((tag) => (
                      <Tag
                        variant="solid"
                        size="md"
                        borderRadius="full"
                        colorScheme="teal"
                        key={tag.id}
                      >
                        {tag.name}
                      </Tag>
                    ))}
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
        <PageSelect />
      </Container>
    </Box>
  );
};

export default SearchArticlePage;
