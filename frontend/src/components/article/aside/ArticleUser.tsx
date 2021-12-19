import React, { VFC } from "react";

import dayjs from "dayjs";
import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";

const ArticleUser: VFC = () => {
  const { data } = useSingleArticle();
  return (
    <HStack bgColor="white" borderRadius="2xl" p={5} mb={5}>
      <Avatar size="md" src={data?.article.user.avatar.url} />
      <Stack>
        <Text fontSize="sm">{data?.article.user.name}</Text>
        <Text fontSize="sm">
          {dayjs(data?.article.created_at).format("YYYY年MM月DD年hh時mm分")}
        </Text>
      </Stack>
    </HStack>
  );
};

export default ArticleUser;
