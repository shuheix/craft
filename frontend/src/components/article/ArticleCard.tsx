import { Box, Flex, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import UserInformation from "../user/UserInformation";

type Props = {
  title: string;
};

const ArticleCard: VFC<Props> = (props) => {
  const { title, username, created_at } = props;
  return (
    <Flex
      w="200px"
      h="260px"
      shadow="md"
      borderRadius="10px"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box h="100px" borderTopRadius="10px" bgColor="teal.200"></Box>
      <Box>
        <Text fontSize={20} fontWeight={500}>
          {title}
        </Text>
      </Box>
      <Box pb={4}>
        <UserInformation name="onos" boxSize="50px" />
      </Box>
    </Flex>
  );
};

export default ArticleCard;
