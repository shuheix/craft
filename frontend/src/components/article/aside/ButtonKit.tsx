import { EditIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { ArticleApiType } from "../../../types/apiType";

type Props = {
  uid: string | undefined;
  onOpen: () => void;
  onClickEditButton: () => void;
  createFavorite: () => void;
  destroyFavorite: () => void;
  data: ArticleApiType | null;
};

const ButtonKit: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const {
    uid,
    onClickEditButton,
    onOpen,
    createFavorite,
    destroyFavorite,
    data,
  } = props;
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
        ) : data?.articles.favorites.find(
            (item) => item.uid === currentUser?.uid
          ) ? (
          <IconButton
            bgColor="white"
            onClick={destroyFavorite}
            color="yellow.200"
            aria-label="favorite"
            icon={<StarIcon />}
            fontSize="20px"
          />
        ) : (
          <Button onClick={createFavorite} color="grey.200">
            1
          </Button>
        )}
      </Box>
    </>
  );
};

export default ButtonKit;
