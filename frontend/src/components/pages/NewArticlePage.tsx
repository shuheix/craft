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
  useToast,
} from "@chakra-ui/react";
import Header from "../header/Header";
import { useForm } from "react-hook-form";
import { AttachmentIcon } from "@chakra-ui/icons";
import axios from "axios";
import { auth } from "../../firebase";
import { CREATE_ARTICLE_API } from "../../constant/railsRoute";
import { useHistory } from "react-router-dom";

type InputValue = {
  title: string;
  text: string;
};

const NewArticlePage: VFC = () => {
  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputValue>();

  const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputImage = event.target.files;
    if (inputImage !== null) {
      setImage(inputImage[0]);
    }
  };

  const onClickInput = () => {
    inputRef.current?.click();
  };

  const onSubmit = (data: InputValue) => {
    const { title, text } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    if (image !== undefined) {
      formData.append("image", image);
    }
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: CREATE_ARTICLE_API,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: formData,
      })
        .then((res) => {
          history.push(`/articles/${res.data.articles.id}`);
          toast({
            title: "投稿しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "投稿に失敗しました",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };

  return (
    <>
      <Header />
      <Container py={20} maxW="container.lg">
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
              data-cy="title"
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
              data-cy="text"
            />
          </FormControl>
          <HStack mt={3}>
            <Spacer />
            <IconButton
              aria-label="Input-image"
              icon={<AttachmentIcon />}
              onClick={onClickInput}
              isLoading={isSubmitting}
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
            <br />
            <p>{image?.name}</p>
          </HStack>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
