import { Button, FormControl, Text } from "@chakra-ui/react";

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
    if (password === passwordConfirmation) {
      auth.createUserWithEmailAndPassword(email, password);
    } else {
      // パスワードが違ったときの処理
    }
  };

  const checkCurrentUser = () => {
    console.log(auth.currentUser);
  };

  const login = () => {
    auth.signInWithEmailAndPassword("ono.shuhei210@gmail.com", "syuu0210");
  };

  return (
    <FormControl>
      <TextInput
        placeholder="ユーザー名"
        value={username}
        onChange={inputUsername}
        mb={4}
      />
      <TextInput placeholder="Email" value={email} onChange={inputEmail} />

      <TextInput
        placeholder="Password"
        value={password}
        onChange={inputPassword}
      />
      <TextInput
        placeholder="passwordConfirmation"
        value={passwordConfirmation}
        onChange={inputPasswordConfirmation}
      />
      <Button onClick={createNewUser}>登録</Button>
      <Button onClick={login}>ログイン</Button>
      <Button onClick={checkCurrentUser}>ログインユーザー確認</Button>
    </FormControl>
  );
};

export default Login;
