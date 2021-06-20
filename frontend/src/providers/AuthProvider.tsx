import React, { createContext, FC, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider: FC = (props: any) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
