import { Input } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  handleSignUpState: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignUp: VFC<Props> = (props) => {
  const {
    username,
    email,
    password,
    passwordConfirmation,
    handleSignUpState,
  } = props;

  return (
    <>
      <Input
        placeholder="ユーザー名"
        name="username"
        mb={3}
        value={username}
        onChange={handleSignUpState}
        w="sm"
        mx="auto"
      />
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
      <Input
        placeholder="パスワード確認"
        name="passwordConfirmation"
        mb={3}
        value={passwordConfirmation}
        onChange={handleSignUpState}
        w="sm"
        mx="auto"
      />
    </>
  );
};

export default SignUp;
