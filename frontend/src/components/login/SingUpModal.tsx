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
  Text,
  Input,
} from "@chakra-ui/react";

const SingUpModal = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setUsername(event.target.value);
  };

  const onChangePasswordConfirmation = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>アカウント登録情報</Text>
          </ModalBody>
          <Input
            placeholder="ユーザー名"
            mb={3}
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            placeholder="Email"
            mb={3}
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            placeholder="パスワード"
            mb={3}
            value={password}
            onChange={onChangePassword}
          />
          <Input
            placeholder="パスワード確認"
            mb={3}
            value={passwordConfirmation}
            onChange={onChangePasswordConfirmation}
          />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingUpModal;
