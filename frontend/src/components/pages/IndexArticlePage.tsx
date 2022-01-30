import React, { VFC } from "react";
import {
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
import Header from "../header/Header";
import { useIndexArticle } from "../../hooks/fetch/useIndexArticle";
import PageSelect from "../footer/PageSelect";
import { useAppHistory } from "../../hooks/useAppHistory";
import dayjs from "dayjs";
import { CalendarIcon } from "@chakra-ui/icons";
import UserAvatar from "../user/UserAvatar";
import TagRanks from "../article/tag/TagRanks";

const IndexArticlePage: VFC = () => {
  const { data, isError, isLoading } = useIndexArticle();
  const { goShowArticlePage } = useAppHistory();
  console.log(data?.meta);

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
        <HStack mt={20}>
          <Box w="100%" mr={10}>
            <SimpleGrid
              columns={{ md: 1 }}
              spacingX="40px"
              spacingY="20px"
              w="100%"
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
                  <HStack h="100%" px={4}>
                    <UserAvatar src={article.user.avatar.url} />
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
            <PageSelect data={data} />
          </Box>
          <TagRanks />
        </HStack>
      </Container>
    </Box>
  );
};

export default IndexArticlePage;
