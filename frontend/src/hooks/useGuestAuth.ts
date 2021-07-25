import axios from "axios";
import { USERS_URI } from "../constant/railsRoute";
import { auth } from "../firebase";

export const useGuestAuth = () => {
  const guestLogin = () => {
    auth.signInAnonymously().then(() => {
      auth.currentUser?.getIdToken(true).then((token) => {
        console.log(token);
        axios.post(USERS_URI, {
          token: token,
          registration: { name: "ゲストユーザー" },
        });
      });
    });
  };
  return { guestLogin };
};
