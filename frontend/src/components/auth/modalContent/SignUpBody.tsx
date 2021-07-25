import { Button, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import React, { VFC } from "react";
import SignUpParams from "./SignUpParams";

type Props = {
  handleSignUpState: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUp: () => void;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpBody: VFC<Props> = (props) => {
  const {
    handleSignUpState,
    signUp,
    username,
    email,
    password,
    passwordConfirmation,
  } = props;
  return (
    <>
      <ModalHeader mx="auto">新規登録</ModalHeader>
      <ModalBody>
        <SignUpParams
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
      </ModalFooter>
    </>
  );
};

export default SignUpBody;
