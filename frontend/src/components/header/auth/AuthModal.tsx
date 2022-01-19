import React, { VFC } from "react";
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
import { useAuth } from "../../../hooks/useAuth";
import SignUpBody from "./modalContent/SignUpBody";
import LoginBody from "./modalContent/LoginBody";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { useGuestAuth } from "../../../hooks/useGuestAuth";

const AuthModal: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSignUpState,
    signUp,
    login,
    stateReset,
    username,
    email,
    password,
    passwordConfirmation,
  } = useAuth();
  const { googleLogin } = useGoogleAuth();
  const { guestLogin } = useGuestAuth();

  return (
    <>
      <Button onClick={onOpen} data-cy="login">
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant="enclosed" size="lg">
            <TabList>
              <Tab onClick={stateReset}>Login</Tab>
              <Tab onClick={stateReset}>新規登録</Tab>
            </TabList>
            <TabPanels h="400px">
              <TabPanel>
                <LoginBody
                  email={email}
                  password={password}
                  login={login}
                  handleSignUpState={handleSignUpState}
                  googleLogin={googleLogin}
                  guestLogin={guestLogin}
                />
              </TabPanel>
              <TabPanel>
                <SignUpBody
                  username={username}
                  email={email}
                  password={password}
                  passwordConfirmation={passwordConfirmation}
                  handleSignUpState={handleSignUpState}
                  signUp={signUp}
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
