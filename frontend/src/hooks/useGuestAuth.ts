import axios from "axios";
import { USERS_API } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useGuestAuth = () => {
  const guestLogin = () => {
    auth.signInAnonymously().then(() => {
      auth.currentUser?.updateProfile({ displayName: "ゲストユーザー" });
      auth.currentUser?.getIdToken(true).then((token) => {
        axios.post(USERS_API, {
          token: token,
          registration: { name: "ゲストユーザー" },
        });
      });
    });
  };
  return { guestLogin };
};
