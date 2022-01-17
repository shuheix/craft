import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  leastDestructiveRef: React.MutableRefObject<null>;
  onClose: () => void;
  isOpen: boolean;
  isCentered?: boolean | undefined;
  onClickDestroyButton: () => void;
  title: string | undefined;
};

const DeleteArticleDialog: VFC<Props> = (props) => {
  const {
    leastDestructiveRef,
    onClose,
    isOpen,
    isCentered,
    onClickDestroyButton,
    title,
  } = props;
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered={isCentered}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>この記事を削除しますか？</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            投稿「{title}」を削除しようとしています。
            <br />
            この操作は取り消せません。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              data-cy="deleteButton"
              colorScheme="red"
              ml={3}
              onClick={() => {
                onClickDestroyButton();
                onClose();
              }}
            >
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteArticleDialog;
