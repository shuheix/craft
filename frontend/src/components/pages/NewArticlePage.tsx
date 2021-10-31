import React, { useRef, useState, VFC } from "react";

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import Header from "../header/Header";
import { useForm } from "react-hook-form";
import { AttachmentIcon } from "@chakra-ui/icons";
import axios from "axios";
import { auth } from "../../firebase";
import { CREATE_ARTICLE_API } from "../../constant/railsRoute";

type InputValue = {
  title: string;
  text: string;
};

const NewArticlePage: VFC = () => {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputValue>();

  const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputImage = event.target.files;
    if (inputImage != null) {
      const inputArray = Array.from(inputImage);
      setImages(inputArray);
    }
  };

  const onClickInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    inputRef.current?.click();
  };

  const onSubmit = (data: InputValue) => {
    const { title, text } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    images.forEach((image) => formData.append("image", image));
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: CREATE_ARTICLE_API,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: formData,
      }).then((res) => {
        const resp = res.status.toString();
        console.log(resp);
      });
    });
  };

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
            <IconButton
              aria-label="Input-image"
              icon={<AttachmentIcon />}
              onClick={onClickInput}
            />
            <input
              ref={inputRef}
              type="file"
              id="image"
              onChange={getImage}
              accept="image/*"
              multiple
              hidden
            />
            <Button type="submit" variant="solid">
              投稿
            </Button>
          </HStack>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
