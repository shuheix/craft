import React, { useCallback, useState } from "react";
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

  return (
    <div>
      <TextInput
        placeholder="ユーザー名"
        value={username}
        onChange={inputUsername}
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
    </div>
  );
};

export default Login;
