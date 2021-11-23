import React, { VFC } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import DeleteArticleDialog from "../../article/dialog/DeleteArticleDialog";
import { useArticleFunction } from "../../../hooks/useArticleFunction";
import { ArticleType } from "../../../types/articleType";

type Props = ButtonProps & { article: ArticleType };

const DeleteArticleButton: VFC<Props> = (props) => {
  const { article } = props;
  const { onClickDestroyButton } = useArticleFunction(article.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  return (
    <>
      <Button
        size="md"
        borderRadius="md"
        p={0}
        bg="white"
        color="red.500"
        {...props}
        onClick={onOpen}
      >
        <DeleteIcon />
      </Button>
      <DeleteArticleDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        onClickDestroyButton={onClickDestroyButton}
        title={article.title}
      />
    </>
  );
};

export default DeleteArticleButton;
