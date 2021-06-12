import { Box, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import UserInformation from "../user/UserInformation";

type Props = {
  id: number;
  title: string;
  text: string;
};

const ArticleCard: VFC<Props> = (props) => {
  const { id, title, text } = props;
  return (
    <Box w="200px" h="260px" bgColor="red.100" shadow="md" borderRadius="10px">
      <Box outline="solid" h="50px"></Box>
      <Box>
        <Text>{id}</Text>
        <Text>{title}</Text>
        <Text>{text}</Text>
      </Box>
      <Box>
        <UserInformation />
      </Box>
    </Box>
  );
};

export default ArticleCard;
