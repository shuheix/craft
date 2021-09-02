import { Box, Heading, Text } from "@chakra-ui/react";
import React, { VFC } from "react";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  data: ArticleApiType | null | undefined;
};

const ShowArticleBody: VFC<Props> = (props) => {
  const { data } = props;
  return (
    <>
      <Box mb={5}>
        <Box shadow="sm" borderRadius="2xl" mb={5} bgColor="white">
          <Heading height="10vh" borderTopRadius="xl" p={5}>
            {data?.articles.title}
          </Heading>
        </Box>
        <Text
          bgColor="white"
          borderBottomRadius="xl"
          p={6}
          whiteSpace="pre-line"
          borderRadius="2xl"
        >
          {data?.articles.text}
        </Text>
      </Box>
    </>
  );
};

export default ShowArticleBody;
