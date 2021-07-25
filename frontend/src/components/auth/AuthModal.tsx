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
<<<<<<< Updated upstream
import SignUp from "./modalContent/SignUp";
=======
import SignUpBody from "./modalContent/SignUpBody";
import LoginBody from "./modalContent/LoginBody";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useGuestAuth } from "../../hooks/useGuestAuth";
>>>>>>> Stashed changes

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
  const { googleLogin } = useGoogleAuth();
  const { guestLogin } = useGuestAuth();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
<<<<<<< Updated upstream
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
=======
          <Tabs isFitted variant="enclosed" size="lg">
            <TabList>
              <Tab>Login</Tab>
              <Tab>新規登録</Tab>
            </TabList>
            <TabPanels h="400px">
              <TabPanel>
                <LoginBody
                  login={login}
                  email={email}
                  password={password}
                  handleSignUpState={handleSignUpState}
                  googleLogin={googleLogin}
                  guestLogin={guestLogin}
                />
              </TabPanel>
              <TabPanel>
                <SignUpBody
                  handleSignUpState={handleSignUpState}
                  signUp={signUp}
                  username={username}
                  email={email}
                  password={password}
                  passwordConfirmation={passwordConfirmation}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
>>>>>>> Stashed changes
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
