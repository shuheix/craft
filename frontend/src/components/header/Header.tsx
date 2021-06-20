import { Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import AuthModal from "../auth/AuthModal";
import Img from "../user/Img";

const Header: VFC = () => {
  return (
    <Flex bgColor="red.100" height="65px" mb={5}>
      <Img />
      <AuthModal />
    </Flex>
  );
};

export default Header;
