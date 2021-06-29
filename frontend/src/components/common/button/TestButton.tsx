import { Button } from "@chakra-ui/react";
import { auth } from "../../../firebase";

const TestButton = () => {
  const outputLog = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      console.log(token);
    });
  };
  return (
    <div>
      <Button onClick={outputLog}>log</Button>
    </div>
  );
};

export default TestButton;
