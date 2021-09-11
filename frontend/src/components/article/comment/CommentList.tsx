import {
  Box,
  Heading,
  Divider,
  Stack,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { useComment } from "../../../hooks/useComment";

type Props = {
  articleId: string;
};

const CommentList: VFC<Props> = (props) => {
  const { articleId } = props;
  const { comment, isError, isLoading, mutate } = useComment(articleId);
  return (
    <>
      <Box mb={5}>
        <Heading size="md" pl={2} mb={1}>
          コメント
        </Heading>
        <Divider colorScheme="whiteAlpha" />
      </Box>
      <Stack>
        {comment?.map((comment) => (
          <HStack bgColor="white" borderRadius="md" key={comment.id}>
            <Avatar />
            <Stack>
              <Heading />
              <Text borderBottomRadius="xl" p={6} whiteSpace="pre-line">
                {comment.text}
              </Text>
            </Stack>
          </HStack>
        ))}
      </Stack>
    </>
  );
};

export default CommentList;
