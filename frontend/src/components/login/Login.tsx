import { Button, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { auth } from "../../firebase";
import TextInput from "../common/input/TextInput";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  const inputPasswordConfirmation = useCallback((event) => {
    setPasswordConfirmation(event.target.value);
  }, []);

  const createNewUser = () => {
    auth.createUserWithEmailAndPassword(email, password);
    console.log(email, password);
  };

  return (
    <div>
      <Text>{username}</Text>
      <TextInput
        placeholder="ユーザー名"
        value={username}
        onChange={inputUsername}
      />
      <Text>{email}</Text>
      <TextInput placeholder="Email" value={email} onChange={inputEmail} />

      <Text>{password}</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChange={inputPassword}
      />
      <Text>{passwordConfirmation}</Text>
      <TextInput
        placeholder="passwordConfirmation"
        value={passwordConfirmation}
        onChange={inputPasswordConfirmation}
      />
      <Button onClick={createNewUser}>登録</Button>
    </div>
  );
};

export default Login;
