import { Box } from "@chakra-ui/react";
import React, { VFC } from "react";
import Img from "../common/user/Img";

const Header: VFC = () => {
  return (
    <Box bgColor="red.100" height="65px" mb={5}>
      <Img />
    </Box>
  );
};

export default Header;
