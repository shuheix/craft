import { EditIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
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
      <Box ml={2}>
        {currentUser?.uid === uid ? (
          <>
            <Button
              size="lg"
              ml={3}
              mb={3}
              borderRadius="2xl"
              p={0}
              bgColor="white"
              onClick={onClickEditButton}
            >
              <EditIcon px={0} />
            </Button>
            <Button
              size="lg"
              ml={3}
              mb={3}
              borderRadius="2xl"
              p={0}
              bgColor="white"
              onClick={onOpen}
            >
              <DeleteIcon />
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            ml={3}
            mb={3}
            borderRadius="2xl"
            p={0}
            bgColor="white"
          >
            <StarIcon color="gray.200" />
          </Button>
        )}
      </Box>
    </>
  );
};

export default ButtonKit;
