import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSignUpState,
    signUp,
    login,
    username,
    email,
    password,
    passwordConfirmation,
  } = useAuth();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mx="auto">新規登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <Input
            placeholder="ユーザー名"
            name="username"
            mb={3}
            value={username}
            onChange={handleSignUpState}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="Email"
            name="email"
            mb={3}
            value={email}
            onChange={handleSignUpState}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="パスワード"
            name="password"
            mb={3}
            value={password}
            onChange={handleSignUpState}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="パスワード確認"
            name="passwordConfirmation"
            mb={3}
            value={passwordConfirmation}
            onChange={handleSignUpState}
            w="xs"
            mx="auto"
          />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={signUp} mx="auto" w="xs">
              登録
            </Button>
            <Button colorScheme="blue" mr={3} onClick={login} mx="auto" w="xs">
              ログイン
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
