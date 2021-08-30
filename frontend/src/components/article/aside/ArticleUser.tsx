import { HStack, Avatar, Stack, Heading, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  data: ArticleApiType | null;
};
const ArticleUser: VFC<Props> = (props) => {
  const { data } = props;
  return (
    <HStack bgColor="white" borderRadius="2xl" p={5} ml={5} mb={5}>
      <Avatar size="md" />
      <Stack>
        <Heading size="sm">{data?.articles.user.name}</Heading>
        <Text>{data?.articles.created_at}</Text>
      </Stack>
    </HStack>
  );
};

export default ArticleUser;
