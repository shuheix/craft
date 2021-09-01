import {
  Box,
  Center,
  Container,
  Flex,
  IconButton,
  Spinner,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import {
  INDEX_COMMENTS_API,
  SINGLE_ARTICLE_API,
} from "../../constant/railsRoute";
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
import { StarIcon } from "@chakra-ui/icons";
import { CommentType } from "../../types/commentType";
import axios from "axios";
import { auth } from "../../firebase";

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
  const [comments, setComments] = useState<CommentType[] | null>([]);

  const [favorite, setFavorite] = useBoolean();

  useEffect(() => {
    fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
  }, [articleId, fetchSingleArticle]);

  useEffect(() => {
    axios
      .get<CommentType[] | null>(INDEX_COMMENTS_API(articleId))
      .then((res) => {
        setComments(res.data);
      });
  }, [articleId]);

  const postComments = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(INDEX_COMMENTS_API(articleId), {
          headers: { Authorization: token },
          text: comments,
        })
        .then(() => {
          axios
            .get<CommentType[]>(INDEX_COMMENTS_API(articleId))
            .then((res) => {
              setComments(res.data);
            });
        });
    });
  };

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
                  <p>test</p>
                  {comments?.map((item) => (
                    <p>{item.text}</p>
                  ))}
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
                  <IconButton
                    aria-label="favorite"
                    icon={<StarIcon fontSize="20px" />}
                    onClick={() => setFavorite.toggle()}
                    bgColor="white"
                    color={favorite ? "yellow.300" : "gray.300"}
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
