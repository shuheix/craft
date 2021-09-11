import {
  Box,
  Center,
  Container,
  Flex,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useParams } from "react-router-dom";
import { useArticleFunction } from "../../hooks/useArticleFunction";
import ShowArticleBody from "../article/body/ShowArticleBody";
import ButtonKit from "../article/aside/ButtonKit";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import TagList from "../article/TagList";
import Header from "../header/Header";
import ArticleUser from "../article/aside/ArticleUser";
import { useFavorite } from "../../hooks/useFavorite";
import { StarIcon } from "@chakra-ui/icons";
import CommentSet from "../article/comment/CommentSet";
import { AuthContext } from "../../providers/AuthProvider";
import { useSingleArticle } from "../../hooks/useSingleArticle";

const ShowArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { currentUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, isError, isLoading } = useSingleArticle(articleId);
  const { onClickDestroyButton, onClickEditButton } = useArticleFunction(
    articleId
  );
  const { createFavorite, destroyFavorite } = useFavorite(articleId);

  if (isError) return <p>error!</p>;
  return (
    <>
      <Box bgColor="teal.50" minH="100vh">
        <Header />
        <Container px={0} py={20} maxW="container.lg">
          {isLoading ? (
            <>
              <Center>
                <Spinner />
              </Center>
            </>
          ) : (
            <>
              <Flex>
                <Box w="100%">
                  <ShowArticleBody data={data} />
                  <CommentSet articleId={articleId} />
                </Box>
                <Box maxW="300px">
                  <ArticleUser data={data} />
                  <TagList />
                  <ButtonKit
                    onOpen={onOpen}
                    uid={data?.articles.user.uid}
                    onClickEditButton={onClickEditButton}
                    data={data}
                    createFavorite={createFavorite}
                    destroyFavorite={destroyFavorite}
                  />
                  {!!data?.articles.favorites.find(
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
                </Box>
              </Flex>
              <DeleteArticleDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                onClickDestroyButton={onClickDestroyButton}
                title={data?.articles.title}
              />
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ShowArticlePage;
