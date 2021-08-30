import {
  Box,
  Center,
  Container,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import { useArticle } from "../../hooks/useArticle";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";
import ShowArticleBody from "../article/body/ShowArticleBody";
import ButtonKit from "../article/aside/ButtonKit";
import CommentForm from "../article/comment/CommentForm";
import CommentList from "../article/comment/CommentList";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import TagList from "../article/TagList";
import Header from "../header/Header";
import ArticleUser from "../article/aside/ArticleUser";
import { useFavorite } from "../../hooks/useFavorite";

const ArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, error, loading, fetchSingleArticle } = useFetchSingleArticle();
  const { createFavorite, destroyFavorite } = useFavorite(articleId);
  const { onClickDestroyButton, onClickEditButton } = useArticle(
    articleId,
    data
  );

  useEffect(() => {
    fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <p>error!</p>;

  return (
    <>
      <Box bgColor="teal.50" minH="100vh">
        <Header />
        <Container px={0} py={20} maxW="container.lg">
          {loading ? (
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
                  <CommentList data={data} />
                  <CommentForm articleId={articleId} />
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

export default ArticlePage;
