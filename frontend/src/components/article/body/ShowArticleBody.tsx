import { Box, Heading, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  data: ArticleApiType | null;
};

const ShowArticleBody: VFC<Props> = (props) => {
  const { data } = props;
  return (
    <Box
      w="100%"
      bgColor="white"
      boxShadow="xl"
      borderRadius="2xl"
      border="1px"
      borderColor="gray.100"
      mb={10}
    >
      <Heading height="10vh" borderTopRadius="xl" p={5}>
        {data?.articles.title}
      </Heading>
      <Text borderBottomRadius="xl" p={6} whiteSpace="pre-line">
        {data?.articles.text}
      </Text>
    </Box>
  );
};

export default ShowArticleBody;
