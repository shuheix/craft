import {
  Box,
  Heading,
  Divider,
  Stack,
  HStack,
  Textarea,
  Spacer,
  Button,
  Text,
  Spinner,
  Center,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import React, { VFC } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { INDEX_COMMENTS_API } from "../../../constant/railsRoute";
import { auth } from "../../../firebase";
import { useComment } from "../../../hooks/useComment";
import UserAvatar from "../../user/UserAvatar";

type Comment = {
  text: string;
};

const CommentList: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Comment>();
  const { comments, isError, isLoading, mutate } = useComment(articleId);

  const onSubmit = (data: Comment) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: INDEX_COMMENTS_API(articleId),
        method: "POST",
        headers: { Authorization: token },
        data: { text: data.text },
      }).then(() => {
        mutate();
        reset();
      });
    });
  };
  console.log(errors.text?.message);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (isError) return <p>Error!</p>;

  return (
    <>
      <Box mb={2}>
        <Heading size="md" pl={2} mb={1}>
          コメント
        </Heading>
        <Divider colorScheme="whiteAlpha" />
      </Box>
      <Stack>
        {comments?.map((comment) => (
          <HStack bgColor="white" borderRadius="xl" key={comment.id}>
            <UserAvatar src={comment.user.avatar.url} ml={2} />
            <Text
              borderBottomRadius="xl"
              p={6}
              whiteSpace="pre-line"
              overflowWrap="anywhere"
            >
              {comment.text}
            </Text>
          </HStack>
        ))}
      </Stack>
      <Box mt={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.text}>
            <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
            <Textarea
              resize="none"
              bgColor="white"
              rows={20}
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
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                投稿
              </Button>
            </HStack>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default CommentList;
