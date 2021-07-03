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
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import SignUp from "./modalContent/SignUp";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSignUpState,
    signUp,
    login,
    logout,
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
          <ModalBody>
            <SignUp
              username={username}
              email={email}
              password={password}
              passwordConfirmation={passwordConfirmation}
              handleSignUpState={handleSignUpState}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={signUp} mx="auto" w="xs">
              登録
            </Button>
            <Button colorScheme="blue" mr={3} onClick={login} mx="auto" w="xs">
              ログイン
            </Button>
            <Button colorScheme="blue" mr={3} onClick={logout} mx="auto" w="xs">
              ログアウト
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
