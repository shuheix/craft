import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../providers/AuthProvider";

const TestButton = () => {
  const { currentUser } = useContext(AuthContext);

  const outputLog = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      console.log(token);
    });
  };
  const currentState = () => {
    console.log("currentuser:", currentUser?.email);
  };

  return (
    <div>
      <Button
        onClick={() => {
          outputLog();
          currentState();
        }}
      >
        log
      </Button>
    </div>
  );
};

export default TestButton;
