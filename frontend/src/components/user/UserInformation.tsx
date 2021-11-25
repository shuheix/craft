import React, { VFC } from "react";

import dayjs from "dayjs";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

type Props = {
  name?: string;
  boxSize?: string;
  createdAt: string;
};

const UserInformation: VFC<Props> = (props) => {
  const { name, boxSize, createdAt } = props;
  return (
    <HStack ml={2}>
      <Image
        src="https://source.unsplash.com/random"
        alt="user_id"
        boxSize={boxSize}
        borderRadius="full"
        mt={1}
      />
      <Box pl={2}>
        <VStack>
          <Text fontSize="sm">{name}</Text>
          <Text fontSize="sm">{dayjs(createdAt).format("YYYY年MM月DD日")}</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

export default UserInformation;
