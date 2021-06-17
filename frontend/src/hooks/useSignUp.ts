import { useState, useCallback } from "react";

export const useSignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleInputState = useCallback((event) => {
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
  }, []);
  return { handleInputState, username, email, password, passwordConfirmation };
};
