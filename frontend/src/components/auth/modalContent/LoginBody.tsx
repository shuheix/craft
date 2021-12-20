import { Button, Flex, Input } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  login: () => void;
  email: string;
  password: string;
  handleSignUpState: (event: React.ChangeEvent<HTMLInputElement>) => void;
  googleLogin: () => void;
  guestLogin: () => void;
};

const LoginBody: VFC<Props> = (props) => {
  const {
    login,
    email,
    password,
    handleSignUpState,
    googleLogin,
    guestLogin,
  } = props;

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-end">
        <Button onClick={googleLogin} w="sm" mx="auto" mb={3}>
          GoogleLogin
        </Button>
        <Button
          onClick={guestLogin}
          w="sm"
          mx="auto"
          mb={3}
          data-cy="GuestLogin"
        >
          GuestLogin
        </Button>

        <Input
          placeholder="Email"
          name="email"
          mb={3}
          value={email}
          onChange={handleSignUpState}
          w="sm"
          mx="auto"
        />
        <Input
          placeholder="パスワード"
          name="password"
          mb={3}
          value={password}
          onChange={handleSignUpState}
          w="sm"
          mx="auto"
        />
        <Button colorScheme="blue" mr={3} onClick={login} mx="auto" w="xs">
          ログイン
        </Button>
      </Flex>
    </>
  );
};

export default LoginBody;
