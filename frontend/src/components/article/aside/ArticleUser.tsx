import React, { VFC } from "react";

import { HStack, Avatar, Text } from "@chakra-ui/react";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";
import { useHistory } from "react-router-dom";
import { SHOW_USER_URL } from "../../../constant/appHistory";
import { useResponsiveStyle } from "../../../hooks/useResponsiveStyle";

const ArticleUser: VFC = () => {
  const { data } = useSingleArticle();
  const history = useHistory();
  const { isLargerThan768 } = useResponsiveStyle();

  const onClickUser = () => {
    if (data?.article.user.uid != null) {
      history.push(SHOW_USER_URL(data.article.user.uid));
    }
  };

  if (isLargerThan768) {
    return (
      <HStack
        bgColor="white"
        borderRadius="2xl"
        p={5}
        mb={5}
        onClick={onClickUser}
        _hover={{ cursor: "pointer" }}
      >
        <Avatar size="md" src={data?.article.user.avatar.url} />
        <Text fontSize="sm">{data?.article.user.name}</Text>
      </HStack>
    );
  }
  return null;
};

export default ArticleUser;
