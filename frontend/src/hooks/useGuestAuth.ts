import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { USERS_API } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useGuestAuth = () => {
  const toast = useToast();
  const guestLogin = () => {
    auth.signInAnonymously().then(() => {
      auth.currentUser
        ?.updateProfile({ displayName: "ゲストユーザー" })
        .then(() => {
          auth.currentUser?.getIdToken(true).then((token) => {
            axios({
              url: USERS_API,
              method: "POST",
              headers: {
                Authorization: token,
              },
              data: {
                registration: { name: "ゲストユーザー" },
              },
            }).then((res) => {
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
