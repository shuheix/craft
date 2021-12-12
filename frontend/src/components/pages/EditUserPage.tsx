import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import { useUser } from "../../hooks/fetch/useUser";
import Header from "../header/Header";
import UserAvatar from "../user/UserAvatar";

type InputValue = {
  name: string;
  profile: string;
};

const EditUserPage: VFC = () => {
  const [file, setFile] = useState<File>();
  const { uid } = useParams<{ uid: string }>();
  const { data, mutate } = useUser();
  const imageRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputValue>();

  const onSubmit = () => {};

  const post = () => {
    const avatar = new FormData();
    if (typeof file === "undefined") return;
    avatar.append("avatar", file);
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: `http://localhost:3000/api/v1/users/${uid}/avatar`,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: avatar,
      }).then((res) => {
        mutate();
      });
    });
  };

  const getFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setFile(event.target.files[0]);
  };

  return (
    <Box bgColor="teal.50" minH="100vh">
      <Header />
      <Container maxW="container.md" bgColor="white" py={20}>
        <VStack alignItems="flex-start">
          <UserAvatar
            size="2xl"
            onChange={getFile}
            src={data?.user.avatar.url}
          />
          <Button onClick={post}>on</Button>
          <Input type="file" onChange={getFile} />
          <Box w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.name || !!errors.profile} mt={5}>
                <HStack>
                  <FormLabel htmlFor="name" pl={1}>
                    表示名
                  </FormLabel>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </HStack>
                <Input
                  id="name"
                  defaultValue={data?.user.name}
                  {...register("name", {
                    required: "必須入力項目です",
                    maxLength: {
                      value: 10,
                      message: "表示名は最大10文字までです。",
                    },
                  })}
                />
                <HStack mt={5}>
                  <FormLabel htmlFor="name" pl={1}>
                    プロフィール
                  </FormLabel>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </HStack>
                <Textarea
                  rows={10}
                  id="profile"
                  defaultValue={data?.user.profile}
                  {...register("profile", {
                    maxLength: {
                      value: 500,
                      message: "プロフィールは最大500文字までです。",
                    },
                  })}
                />
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>

    // <div>
    //   <form action="">
    //     <input type="file" onChange={getFile} />
    //     <Button onClick={post}>ボタン</Button>
    //     <UserAvatar />
    //     <AvatarModal />
    //   </form>
    // </div>
  );
};

export default EditUserPage;
