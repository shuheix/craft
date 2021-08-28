import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, UseDisclosureProps } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { AuthContext } from "../../providers/AuthProvider";

type Props = {
  uid: string | undefined;
  onOpen: () => void;
  onClickEditButton: () => void;
};

const ButtonKit: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { uid, onClickEditButton, onOpen } = props;
  return (
    <>
      <Flex flexDirection="column">
        {currentUser?.uid === uid ? (
          <>
            <Button
              ml={3}
              mb={3}
              size="lg"
              borderRadius="full"
              p={0}
              bgColor="white"
              onClick={onClickEditButton}
            >
              <EditIcon px={0} />
            </Button>
            <Button
              ml={3}
              mb={3}
              size="lg"
              borderRadius="full"
              p={0}
              bgColor="white"
              onClick={onOpen}
            >
              <DeleteIcon />
            </Button>
            <Button
              ml={3}
              size="lg"
              borderRadius="full"
              p={0}
              bgColor="white"
            ></Button>
          </>
        ) : (
          <Button
            ml={3}
            size="lg"
            borderRadius="full"
            p={0}
            bgColor="white"
          ></Button>
        )}
      </Flex>
    </>
  );
};

export default ButtonKit;
