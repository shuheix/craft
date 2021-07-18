import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import TestButton from "../common/button/TestButton";
import UserImg from "../user/UserImg";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Flex height="65px" px={5}>
        <UserImg />
        <AuthModal />
        <Box>{currentUser?.email}</Box>
        <TestButton />
        <SettingsIcon w={8} h={8} />
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
