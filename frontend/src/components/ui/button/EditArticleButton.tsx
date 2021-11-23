import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { VFC } from "react";
import { useArticleFunction } from "../../../hooks/useArticleFunction";

type Props = ButtonProps & { articleId: string };

const EditArticleButton: VFC<Props> = (props) => {
  const { articleId } = props;
  const { onClickEditButton } = useArticleFunction(articleId);
  return (
    <>
      <Button
        size="md"
        borderRadius="md"
        p={0}
        bg="white"
        color="blue.500"
        onClick={onClickEditButton}
        {...props}
      >
        <EditIcon />
      </Button>
    </>
  );
};

export default EditArticleButton;
