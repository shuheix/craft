import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useIndexArticle } from "../../../hooks/fetch/useIndexArticle";
import { useAppHistory } from "../../../hooks/useAppHistory";
import UserAvatar from "../../user/UserAvatar";
import AnswerdStateTag from "../tag/AnswerdStateTag";

const ArticleList = () => {
  const { data } = useIndexArticle();
  const { goShowArticlePage } = useAppHistory();

  return (
    <SimpleGrid columns={{ md: 1 }} spacingX="40px" spacingY="20px" w="100%">
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
              <HStack justifyContent="space-between" w="100%">
                <Heading size="xs" alignSelf="flex-start" mr={4}>
                  <Icon as={CalendarIcon} mr={1} />
                  {dayjs(article.created_at).format("YYYY年MM月DD日")}
                </Heading>
                <AnswerdStateTag is_answerd={article.is_answerd} />
              </HStack>
              <Heading size="sm" maxWidth="100%" alignSelf="flex-start" ml={4}>
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
  );
};

export default ArticleList;
