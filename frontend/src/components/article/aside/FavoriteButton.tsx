import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useFavorite } from "../../../hooks/useFavorite";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";
import { AuthContext } from "../../../providers/AuthProvider";

const FavoriteButton: VFC = () => {
  const { data } = useSingleArticle();
  const { destroyFavorite, createFavorite } = useFavorite();
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {!!data?.article.favorites.find(
        (item) => item.uid === currentUser?.uid
      ) ? (
        <IconButton
          aria-label="favorite"
          icon={<StarIcon fontSize="20px" />}
          bgColor="white"
          color={"yellow.300"}
          onClick={destroyFavorite}
        />
      ) : (
        <IconButton
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
