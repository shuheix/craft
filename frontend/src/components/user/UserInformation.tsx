import { Box, Flex, Image } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  name: string;
  boxSize?: string;
};

const UserInformation: VFC<Props> = (props) => {
  const { name, boxSize } = props;
  return (
    <Flex>
      <Image
        src="https://source.unsplash.com/random"
        alt="user_id"
        boxSize={boxSize}
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
