import React, { useRef, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Input,
  Textarea,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Spacer,
  useToast,
  Spinner,
  Select,
} from "@chakra-ui/react";
import Header from "../header/Header";
import { AttachmentIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { EDIT_ARTICLE_API } from "../../constant/railsRoute";
import { auth } from "../../firebase";
import { useSingleArticle } from "../../hooks/fetch/useSingleArticle";

type InputValue = {
  title: string;
  text: string;
  is_answerd: string;
};

const EditArticleLayout: VFC = () => {
  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const toast = useToast();
  const { articleId } = useParams<{ articleId: string }>();
  const { data, isLoading, isError } = useSingleArticle();
  console.log(data?.article.is_answerd);

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
    const { title, text, is_answerd } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("is_answerd", is_answerd);

    if (image !== undefined) {
      formData.append("image", image);
    }
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: EDIT_ARTICLE_API(articleId),
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: formData,
      })
        .then((res) => {
          history.push(`/articles/${res.data.articles.id}`);
          toast({
            title: "??????????????????",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "???????????????????????????",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };
  if (isLoading) return <Spinner />;
  if (isError) return <p>Error!</p>;

  return (
    <>
      <Header />
      <Container py={20} maxW="container.xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title || !!errors.text}>
            <Select
              id="is_answerd"
              mb={5}
              {...register("is_answerd")}
              defaultValue={data?.article.is_answerd ? "?????????" : "???????????????"}
            >
              <option value="true">?????????</option>
              <option value="false">???????????????</option>
            </Select>
            <FormErrorMessage data-cy="errors-title">
              {errors.title && errors.title?.message}
            </FormErrorMessage>
            <Input
              id="title"
              defaultValue={data?.article.title}
              placeholder="????????????"
              {...register("title", {
                required: "??????????????????????????????",
                maxLength: { value: 30, message: "?????????????????????30????????????" },
              })}
              minH="50px"
              mb={10}
              data-cy="edit-title"
            />
            <FormErrorMessage data-cy="errors-text">
              {errors.text && errors.text?.message}
            </FormErrorMessage>
            <Textarea
              resize="none"
              id="text"
              defaultValue={data?.article.text}
              {...register("text", {
                required: "????????????????????????",
                maxLength: {
                  value: 1000,
                  message: "????????????????????????1000????????????",
                },
              })}
              rows={20}
              data-cy="edit-text"
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
            <Button type="submit" variant="solid" data-cy="submit">
              ??????
            </Button>
            <br />
            <p>{image?.name}</p>
          </HStack>
        </form>
      </Container>
    </>
  );
};

export default EditArticleLayout;
