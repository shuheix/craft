import { Box, Text } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  id: number;
  title: string;
  text: string;
};

const ArticleCard: VFC<Props> = (props) => {
  const { id, title, text } = props;
  return (
    <Box
      w="200px"
      h="260px"
      bgColor="red.100"
      shadow="md"
      borderRadius="10px"
      p={4}
    >
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{text}</Text>
    </Box>
  );
};

export default ArticleCard;
