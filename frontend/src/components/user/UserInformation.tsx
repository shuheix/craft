import { Box, Flex, Image } from "@chakra-ui/react";
import React, { VFC } from "react";

const UserInformation: VFC = () => {
  return (
    <Flex>
      <Image
        src="https://source.unsplash.com/random"
        alt="user_id"
        boxSize="50px"
        borderRadius="full"
      />
      <Box>
        <p>name</p>
        <p>status</p>
      </Box>
    </Flex>
  );
};

export default UserInformation;
