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
    // googleLogin,
    guestLogin,
  } = props;

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-end">
        {/* <Button onClick={googleLogin} w="sm" mx="auto" mb={3}>
          GoogleLogin
        </Button> */}
        <Button
          onClick={guestLogin}
          w="sm"
          mx="auto"
          mb={3}
          data-cy="GuestLogin"
          bgColor="blue.100"
          _hover={{
            bgColor: "blue.200",
          }}
        >
          ゲストユーザーログイン
        </Button>
        <Input
          placeholder="Email"
          name="email"
          mb={3}
          value={email}
          onChange={handleSignUpState}
          w="sm"
          mx="auto"
          data-cy="email"
        />
        <Input
          placeholder="パスワード"
          name="password"
          mb={3}
          value={password}
          onChange={handleSignUpState}
          w="sm"
          mx="auto"
          data-cy="password"
        />
        <Button
          colorScheme="blue"
          mr={3}
          onClick={login}
          mx="auto"
          w="xs"
          data-cy="ログイン"
        >
          ログイン
        </Button>
      </Flex>
    </>
  );
};

export default LoginBody;
