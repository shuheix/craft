import { Box, Image } from "@chakra-ui/react";
import React from "react";

const UserImg = () => {
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