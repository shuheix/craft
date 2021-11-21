import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { VFC } from "react";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  data: ArticleApiType | null | undefined;
};

const ShowArticleBody: VFC<Props> = (props) => {
  const { data } = props;
  return (
    <>
      <Box mb={5}>
        <Box shadow="sm" borderTopRadius="2xl" bgColor="white">
          <VStack>
            <Heading
              justifyContent="center"
              borderTopRadius="xl"
              p={5}
              overflowWrap="anywhere"
            >
              {data?.articles.title}
            </Heading>
            <HStack spacing={3} pr={5} justifyContent="center">
              <Text fontSize="sm">
                投稿日:
                {dayjs(data?.articles.created_at).format("YYYY年MM月DD日")}
              </Text>
              <Text fontSize="sm">
                更新日:
                {dayjs(data?.articles.updated_at).format("YYYY年MM月DD日")}
              </Text>
            </HStack>
            <Text
              bgColor="white"
              borderBottomRadius="xl"
              p={6}
              whiteSpace="pre-line"
              overflowWrap="anywhere"
            >
              {data?.articles.text}
            </Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default ShowArticleBody;
