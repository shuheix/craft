import { Box, Image } from "@chakra-ui/react";
import React, { VFC } from "react";

const UserImg: VFC = () => {
  return (
    <Box>
      <Image
        src="https://source.unsplash.com/random"
        alt="profile"
        boxSize="50px"
        borderRadius="full"
      />
    </Box>
  );
};

export default UserImg;
