import { useState, useCallback } from "react";
import { auth } from "../firebase";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  //onchangeイベントで発火、inputのvalueでState更新
  const handleSignUpState = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case "username": {
          setUsername(event.target.value);
          break;
        }
        case "email": {
          setEmail(event.target.value);
          break;
        }
        case "password": {
          setPassword(event.target.value);
          break;
        }
        case "passwordConfirmation": {
          setPasswordConfirmation(event.target.value);
          break;
        }
      }
    },
    []
  );
  //新規登録
  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password);
  };
  //ログイン
  const login = () => {
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    });
  };

  return {
    handleSignUpState,
    signUp,
    login,
    username,
    email,
    password,
    passwordConfirmation,
  };
};
