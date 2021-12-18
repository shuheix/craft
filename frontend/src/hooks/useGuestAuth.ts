import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { USERS_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import { UserType } from "../types/userType";

export const useGuestAuth = () => {
  const toast = useToast();
  const guestLogin = () => {
    auth.signInAnonymously().then(() => {
      auth.currentUser
        ?.updateProfile({ displayName: "ゲストユーザー" })
        .then(() => {
          auth.currentUser?.getIdToken(true).then((token) => {
            axios
              .post<UserType>(USERS_API, {
                token: token,
                registration: { name: "ゲストユーザー" },
              })
              .then((res) => {
                toast({
                  title: "ログインしました",
                  status: "success",
                  duration: 5000,
                  position: "top",
                  isClosable: true,
                });
              });
          });
        });
    });
  };
  return { guestLogin };
};
