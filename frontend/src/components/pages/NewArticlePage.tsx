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

  console.log(errors.title?.message);

  const onSubmit = (data: InputValue) => alert(data.text);

  return (
    <>
      <Container px={0} py={20} maxW="container.lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title || !!errors.text}>
            <FormErrorMessage>
              {errors.title && errors.title?.message}
            </FormErrorMessage>
            <Input
              id="title"
              placeholder="タイトル"
              {...register("title", { required: "タイトルが未入力です" })}
              minH="50px"
              mb={10}
            />
            <FormErrorMessage>
              {errors.text && errors.text?.message}
            </FormErrorMessage>

            <Textarea
              id="text"
              {...register("text", { required: "内容が未入力です" })}
              rows={20}
            />
          </FormControl>
          <Button type="submit" mt={4}>
            投稿
          </Button>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
