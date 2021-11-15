import React, { VFC } from "react";

import dayjs from "dayjs";
import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  data: ArticleApiType | null | undefined;
};
const ArticleUser: VFC<Props> = (props) => {
  const { data } = props;
  return (
    <HStack bgColor="white" borderRadius="2xl" p={5} mb={5}>
      <Avatar size="md" />
      <Stack>
        <Text fontSize="sm">{data?.articles.user.name}</Text>
        <Text fontSize="sm">
          {dayjs(data?.articles.created_at).format("YYYY年MM月DD年hh時mm分")}
        </Text>
      </Stack>
    </HStack>
  );
};

export default ArticleUser;
