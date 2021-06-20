import React, { useState } from "react";
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
import { auth } from "../../firebase";

const SingUpModal = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(event.target.value);
  };

  const singnUp = () => {
    if (password === passwordConfirmation) {
      auth.createUserWithEmailAndPassword(email, password);
      onClose();
    } else {
      // パスワードが違った場合の処理を書く
    }
  };

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
            mb={3}
            value={username}
            onChange={onChangeUsername}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="Email"
            mb={3}
            value={email}
            onChange={onChangeEmail}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="パスワード"
            mb={3}
            value={password}
            onChange={onChangePassword}
            w="xs"
            mx="auto"
          />
          <Input
            placeholder="パスワード確認"
            mb={3}
            value={passwordConfirmation}
            onChange={onChangePasswordConfirmation}
            w="xs"
            mx="auto"
          />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={singnUp}
              mx="auto"
              w="xs"
            >
              登録
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingUpModal;
