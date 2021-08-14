import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState, useCallback } from "react";
import { USERS_URI } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const toast = useToast();

  // Email,Passwordを使用したサインイン
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
  // 新規登録
  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      auth.currentUser?.getIdToken(true).then((token) => {
        axios
          .post(USERS_URI, {
            token: token,
            registration: { name: username },
          })
          .then(() => {});
      });
    });
  };
  // ログイン
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        toast({
          title: "ログインしました",
          status: "success",
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast({
          title: "ログインに失敗しました",
          description: "emailとパスワードが正しいかご確認ください",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  // ログアウト
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        toast({
          title: "ログアウトしました",
          status: "success",
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast({
          title: "予期せぬエラーが発生しました",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  //
  const stateReset = () => {
    setEmail("");
    setPassword("");
  };

  return {
    handleSignUpState,
    signUp,
    login,
    logout,
    stateReset,
    username,
    email,
    password,
    passwordConfirmation,
  };
};
