import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { useForm } from "react-hook-form";

import { useCreateArticle } from "../../hooks/useCreateArticle";
import Header from "../header/Header";

const NewArticlePage: VFC = () => {
  type InputValue = {
    title: string;
    text: string;
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
          <Button type="submit" mt={4} isLoading={loading}>
            投稿
          </Button>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
