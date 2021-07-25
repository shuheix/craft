import axios from "axios";
import { useState, useCallback } from "react";
import { USERS_URI } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

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
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setEmail("");
      setPassword("");
      console.log("login成功");
    });
  };

  // ログアウト
  const logout = () => {
    auth.signOut();
  };

  return {
    handleSignUpState,
    signUp,
    login,
    logout,
    username,
    email,
    password,
    passwordConfirmation,
  };
};
