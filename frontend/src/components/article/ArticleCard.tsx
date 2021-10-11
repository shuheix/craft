import { Box, Flex, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import UserInformation from "../user/UserInformation";

type Props = {
  title: string;
  createdAt: string;
  username?: string;
};

const ArticleCard: VFC<Props> = (props) => {
  const { title, username, createdAt } = props;
  return (
    <Flex
      w="220px"
      h="250px"
      shadow="md"
      borderRadius="10px"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box h="100px" borderTopRadius="10px" bgColor="teal.200"></Box>
      <Box>
        <Text fontSize={20} fontWeight={500} pl={3}>
          {title}
        </Text>
      </Box>
      <Box pb={4}>
        <UserInformation name={username} createdAt={createdAt} boxSize="50px" />
      </Box>
    </Flex>
  );
};

export default ArticleCard;
