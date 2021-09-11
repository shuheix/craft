import {
  Box,
  Heading,
  Divider,
  Stack,
  HStack,
  Avatar,
  Textarea,
  Spacer,
  Button,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import React, { VFC } from "react";
import { useForm } from "react-hook-form";
import { INDEX_COMMENTS_API } from "../../../constant/railsRoute";
import { auth } from "../../../firebase";
import { useComment } from "../../../hooks/useComment";

type Comment = {
  text: string;
};
type Props = {
  articleId: string;
};

const CommentSet: VFC<Props> = (props) => {
  const { articleId } = props;
  const { register, handleSubmit, formState, reset } = useForm<Comment>();
  const { comment, isError, isLoading, mutate } = useComment(articleId);

  const onSubmit = (data: Comment) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(INDEX_COMMENTS_API(articleId), {
          headers: { Authorization: token },
          text: data.text,
        })
        .then(() => {
          mutate();
          reset();
        });
    });
  };

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (isError) return <p>Error!</p>;

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
      <Box mt={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            resize="none"
            bgColor="white"
            row={20}
            boxShadow="sm"
            id="text"
            borderRadius="2xl"
            pr={10}
            {...register("text", {
              required: "内容が記載されていません",
              maxLength: {
                value: 1000,
                message: "コメントは最大1000文字までです",
              },
            })}
          />
          <HStack>
            <Spacer />
            <Button type="submit" isLoading={formState.isSubmitting}>
              投稿
            </Button>
          </HStack>
        </form>
      </Box>
    </>
  );
};

export default CommentSet;
