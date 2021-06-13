import { Box, Flex, Image } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  name: string;
};

const UserInformation: VFC<Props> = (props) => {
  const { name } = props;
  return (
    <Flex>
      <Image
        src="https://source.unsplash.com/random"
        alt="user_id"
        boxSize="40px"
        borderRadius="full"
        mt={1}
      />
      <Box pl={2}>
        <p>{name}</p>
        <p>status</p>
      </Box>
    </Flex>
  );
};

export default UserInformation;
