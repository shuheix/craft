import { EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, useMediaQuery } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useAppHistory } from "../../hooks/useAppHistory";
import { AuthContext } from "../../providers/AuthProvider";

const EditIconButton: VFC = () => {
  const { goEditPage } = useAppHistory();
  const { currentUser } = useContext(AuthContext);
  const [isLargerThan768px] = useMediaQuery("(min-Width: 768px)");

  if (!currentUser) return null;
  return (
    <>
      {isLargerThan768px ? (
        <Button
          ml={4}
          onClick={goEditPage}
          data-cy="post"
          variant="solid"
          colorScheme="teal"
        >
          記事投稿
        </Button>
      ) : (
        <IconButton
          data-cy="post"
          icon={<EditIcon />}
          aria-label="edit"
          ml={4}
          onClick={goEditPage}
          colorScheme="green"
        />
      )}
    </>
  );
};

export default EditIconButton;
