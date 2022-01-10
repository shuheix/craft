import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SHOW_USERS_API } from "../../constant/railsRoute";
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
  const [imageUrl, setImageUrl] = useState("");
  const { uid } = useParams<{ uid: string }>();
  const { data, mutate } = useUser();
  const imageRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputValue>();

  const onSubmit = (data: InputValue) => {
    const { name, profile } = data;
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: SHOW_USERS_API(uid),
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        data: {
          name,
          profile,
        },
      })
        .then((res) => {
          toast({
            title: "編集しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "編集に失敗しました",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };

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
        onClose();
      });
    });
  };

  const getFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const fileReader = new FileReader();
      const files = event.target.files;
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result != null) {
          setFile(files[0]);
          setImageUrl(event.target?.result.toString());
          onOpen();
        }
      };
    }
  };

  return (
    <Box bgColor="teal.50" minH="100vh">
      <Header />
      <Container maxW="container.md" bgColor="white" py={20}>
        <VStack alignItems="flex-start">
          <UserAvatar
            size="2xl"
            onClick={() => imageRef.current?.click()}
            onChange={getFile}
            src={data?.user.avatar.url}
            _hover={{ cursor: "pointer" }}
          />
          <Input type="file" onChange={getFile} ref={imageRef} hidden />
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
            <>
              <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <Center>
                      <Avatar src={imageUrl} size="2xl" mt={10} />
                    </Center>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={post}
                      w="100%"
                      m="auto"
                    >
                      適用
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default EditUserPage;
