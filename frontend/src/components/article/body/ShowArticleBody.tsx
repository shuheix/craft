import { Box, Heading, HStack, Text, Stack } from "@chakra-ui/react";
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
        <Box shadow="sm" borderRadius="2xl" mb={5} bgColor="white">
          <Stack>
            <Heading
              justify="flex-start"
              height="10vh"
              borderTopRadius="xl"
              p={5}
            >
              {data?.articles.title}
            </Heading>
            <HStack spacing={5} justify="flex-end" pr={8}>
              <Text>
                投稿日:
                {dayjs(data?.articles.created_at).format("YYYY年MM月DD年")}
              </Text>
              <Text>
                更新日:
                {dayjs(data?.articles.updated_at).format("YYYY年MM月DD年")}
              </Text>
            </HStack>
          </Stack>
        </Box>
        <Text
          bgColor="white"
          borderBottomRadius="xl"
          p={6}
          whiteSpace="pre-line"
          borderRadius="2xl"
        >
          {data?.articles.text}
        </Text>
      </Box>
    </>
  );
};

export default ShowArticleBody;
