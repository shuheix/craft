import React, { VFC } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, useDisclosure, useToast } from "@chakra-ui/react";
import DeleteArticleDialog from "../../article/dialog/DeleteArticleDialog";
import { ArticleType } from "../../../types/articleType";
import { useUser } from "../../../hooks/fetch/useUser";
import axios from "axios";
import { SHOW_ARTICLE_API } from "../../../constant/railsRoute";
import { auth } from "../../../firebase";
import { useParams } from "react-router-dom";

type Props = ButtonProps & { article: ArticleType };

const DeleteArticleButton: VFC<Props> = (props) => {
  const { article } = props;
  const { uid } = useParams<{ uid: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const { mutate } = useUser(uid);

  const deleteArticle = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        headers: { Authorization: token },
        url: `${SHOW_ARTICLE_API(`${article.id}`)}`,
        data: { id: `${article.id}` },
      })
        .then(() => {
          mutate();
          toast({
            title: "削除しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "エラー",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };

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
        onClickDestroyButton={deleteArticle}
        title={article.title}
      />
    </>
  );
};

export default DeleteArticleButton;
