import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { VFC } from "react";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";

const ShowArticleBody: VFC = () => {
  const { data } = useSingleArticle();
  return (
    <>
      <Box mb={5}>
        <Box shadow="sm" borderRadius="2xl" bgColor="white">
          <VStack>
            <Heading
              justifyContent="center"
              borderTopRadius="xl"
              p={5}
              overflowWrap="anywhere"
              data-cy="show-title"
            >
              {data?.article.title}
            </Heading>
            <HStack spacing={3} pr={5} justifyContent="center">
              <Text fontSize="sm">
                投稿日:
                {dayjs(data?.article.created_at).format("YYYY年MM月DD日")}
              </Text>
              <Text fontSize="sm">
                更新日:
                {dayjs(data?.article.updated_at).format("YYYY年MM月DD日")}
              </Text>
            </HStack>
            <Text
              w="100%"
              bgColor="white"
              p={10}
              whiteSpace="pre-line"
              overflowWrap="anywhere"
              borderBottomRadius="2xl"
              data-cy="show-text"
            >
              {data?.article.text}
            </Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default ShowArticleBody;
