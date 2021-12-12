import React, { VFC } from "react";
import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import PageSelect from "../footer/PageSelect";
import { useAppHistory } from "../../hooks/useAppHistory";
import dayjs from "dayjs";
import { CalendarIcon } from "@chakra-ui/icons";
import UserAvatar from "../user/UserAvatar";

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
              <HStack h="100%" px={4}>
                <UserAvatar />
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

export default IndexArticlePage;
