import { EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, useMediaQuery } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useAppHistory } from "../../hooks/useAppHistory";

const EditIconButton: VFC = () => {
  const { goEditPage } = useAppHistory();
  const [isLargerThan768px] = useMediaQuery("(min-Width: 768px)");

  return (
    <>
      {isLargerThan768px ? (
        <Button ml={4} onClick={goEditPage}>
          記事投稿
        </Button>
      ) : (
        <IconButton
          icon={<EditIcon />}
          aria-label="edit"
          ml={4}
          onClick={goEditPage}
        />
      )}
    </>
  );
};

export default EditIconButton;
