import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import Img from "../user/Img";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Flex bgColor="red.100" height="65px" mb={5}>
      <Img />
      <AuthModal />
      <Box>{currentUser?.email}</Box>
    </Flex>
  );
};

export default Header;
