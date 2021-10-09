import axios from "axios";
import { useHistory } from "react-router-dom";
import { USERS_API } from "../constant/railsRoute";
import { auth } from "../firebase";
import { UserType } from "../types/userType";

export const useGuestAuth = () => {
  const history = useHistory();
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
                history.push(`/users/${res.data.uid}`);
              });
          });
        });
    });
  };
  return { guestLogin };
};
