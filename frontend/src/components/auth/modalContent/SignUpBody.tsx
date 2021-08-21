import { Button, Flex } from "@chakra-ui/react";
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
      <Flex flexDirection="column" alignItems="flex-end">
        <SignUpParams
          username={username}
          email={email}
          password={password}
          passwordConfirmation={passwordConfirmation}
          handleSignUpState={handleSignUpState}
        />
        <Button
          colorScheme="blue"
          mr={3}
          onClick={signUp}
          mx="auto"
          w="xs"
          isLoading
        >
          登録
        </Button>
      </Flex>
    </>
  );
};

export default SignUpBody;
