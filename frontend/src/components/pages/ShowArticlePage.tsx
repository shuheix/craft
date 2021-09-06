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
import React, { VFC } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import { useArticle } from "../../hooks/useArticle";
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
import useSWR from "swr";
import axios from "axios";
import { ArticleApiType } from "../../types/apiType";

const ArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { createFavorite, destroyFavorite } = useFavorite(articleId);

  const { data, error } = useSWR(SINGLE_ARTICLE_API(articleId), (url: string) =>
    axios.get<ArticleApiType | null | undefined>(url).then((res) => res.data)
  );
  const [favorite, setFavorite] = useBoolean();

  const { onClickDestroyButton, onClickEditButton } = useArticle(
    articleId,
    data
  );

  if (error) return <p>error!</p>;

  return (
    <>
      <Box bgColor="teal.50" minH="100vh">
        <Header />
        <Container px={0} py={20} maxW="container.lg">
          {error ? (
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
