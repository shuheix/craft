import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import SignUpBody from "./modalContent/SignUpBody";
import LoginBody from "./modalContent/LoginBody";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useGuestAuth } from "../../hooks/useGuestAuth";

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
  const { googleLogin } = useGoogleAuth();
  const { guestLogin } = useGuestAuth();

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
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
<<<<<<< HEAD
                  googleLogin={googleLogin}
                  guestLogin={guestLogin}
=======
>>>>>>> main
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
