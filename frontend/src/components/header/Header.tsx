import { Box, Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import SingUpModal from "../login/SingUpModal";
import Img from "../user/Img";

const Header: VFC = () => {
  return (
    <Flex bgColor="red.100" height="65px" mb={5}>
      <Img />
      <SingUpModal />
    </Flex>
  );
};

export default Header;
