import React, { useState } from "react";
import TextInput from "../common/input/TextInput";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  return (
    <div>
      <TextInput placeholder="ユーザー名" value={username} />
      <TextInput placeholder="Email" value={email} />
      <TextInput placeholder="Password" value={password} />
      <TextInput
        placeholder="PasswordConfirmation"
        value={passwordConfirmation}
      />
    </div>
  );
};

export default Login;
