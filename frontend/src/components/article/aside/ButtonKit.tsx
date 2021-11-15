import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";
import { useArticleFunction } from "../../../hooks/useArticleFunction";
import { AuthContext } from "../../../providers/AuthProvider";
import FavoriteButton from "./FavoriteButton";

type Props = {
  articleId: string;
  onOpen: () => void;
};

const ButtonKit: VFC<Props> = (props) => {
  const { articleId, onOpen } = props;
  const { currentUser } = useContext(AuthContext);
  const { data } = useSingleArticle(articleId);
  const { onClickEditButton } = useArticleFunction(articleId);

  return (
    <>
      <Box>
        {currentUser?.uid === data?.articles.user.uid ? (
          <>
            <Button
              size="lg"
              mb={3}
              borderRadius="2xl"
              p={0}
              bgColor="white"
              color="blue.500"
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
              color="red.500"
            >
              <DeleteIcon />
            </Button>
          </>
        ) : (
          <FavoriteButton articleId={articleId} />
        )}
      </Box>
    </>
  );
};

export default ButtonKit;
