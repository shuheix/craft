import React, { VFC } from "react";

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import Header from "../header/Header";

import { useForm } from "react-hook-form";
import { useCreateArticle } from "../../hooks/useCreateArticle";

const NewArticlePage: VFC = () => {
  type InputValue = {
    title: string;
    text: string;
    image: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputValue>();

  const { postArticle, loading } = useCreateArticle();

  const onSubmit = (data: InputValue) => {
    postArticle(data.title, data.text);
  };
  console.log(errors);

  return (
    <>
      <Header />
      <Container px={0} py={20} maxW="container.lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title || !!errors.text}>
            <FormErrorMessage>
              {errors.title && errors.title?.message}
            </FormErrorMessage>
            <Input
              id="title"
              placeholder="タイトル"
              {...register("title", {
                required: "タイトルが未入力です",
                maxLength: { value: 30, message: "タイトルは最大30文字です" },
              })}
              minH="50px"
              mb={10}
            />
            <FormErrorMessage>
              {errors.text && errors.text?.message}
            </FormErrorMessage>
            <Textarea
              resize="none"
              id="text"
              {...register("text", {
                required: "内容が未入力です",
                maxLength: {
                  value: 10000,
                  message: "投稿内容は、最大10000文字です",
                },
              })}
              rows={20}
            />
          </FormControl>
          <HStack mt={3}>
            <Spacer />
            <input type="file" id="image" />
            <Button type="submit" isLoading={loading} variant="solid">
              投稿
            </Button>
          </HStack>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
