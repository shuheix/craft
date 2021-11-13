import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useFavorite } from "../../../hooks/useFavorite";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";
import { AuthContext } from "../../../providers/AuthProvider";

type Props = {
  articleId: string;
};

const FavoriteButton: VFC<Props> = (props) => {
  const { articleId } = props;
  const { data } = useSingleArticle(articleId);
  const { destroyFavorite, createFavorite } = useFavorite(articleId);
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {!!data?.articles.favorites.find(
        (item) => item.uid === currentUser?.uid
      ) ? (
        <IconButton
          ml={3}
          aria-label="favorite"
          icon={<StarIcon fontSize="20px" />}
          bgColor="white"
          color={"yellow.300"}
          onClick={destroyFavorite}
        />
      ) : (
        <IconButton
          ml={3}
          aria-label="favorite"
          icon={<StarIcon fontSize="20px" />}
          bgColor="white"
          color={"gray.300"}
          onClick={createFavorite}
        />
      )}
    </>
  );
};

export default FavoriteButton;
