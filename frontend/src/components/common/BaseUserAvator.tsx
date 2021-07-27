import { Avatar, Button } from "@chakra-ui/react";
import React from "react";

const BaseUserAvator = () => {
  return (
    <div>
      <Button>
        <Avatar bg="teal.400" size="md" />
      </Button>
    </div>
  );
};

export default BaseUserAvator;
