import React, { createContext, FC, useEffect, useState } from "react";
import { User } from "@firebase/auth-types";
import { auth } from "../firebase";

type AuthType = {
  currentUser: User | null | undefined;
};
export const AuthContext = createContext<AuthType>({ currentUser: undefined });

const AuthProvider: FC = (props: any) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
