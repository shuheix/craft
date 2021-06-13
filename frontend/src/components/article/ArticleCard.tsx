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
      <Box
        h="50px"
        borderRadius="10px"
        bgColor="blue
      .100"
      ></Box>
      <Box>
        <Text>{id}</Text>
        <Text>{title}</Text>
        <Text>{text}</Text>
      </Box>
      <Box>
        <UserInformation name="onos" />
      </Box>
    </Box>
  );
};

export default ArticleCard;
