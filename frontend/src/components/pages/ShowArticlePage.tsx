import React, { VFC } from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useArticleFunction } from "../../hooks/useArticleFunction";
import ShowArticleBody from "../article/body/ShowArticleBody";
import ButtonKit from "../article/aside/ButtonKit";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import TagList from "../article/TagList";
import Header from "../header/Header";
import ArticleUser from "../article/aside/ArticleUser";
import CommentSet from "../article/comment/CommentSet";
import { useSingleArticle } from "../../hooks/fetch/useSingleArticle";
import ImageModal from "../article/modal/ImageModal";

const ShowArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, isError, isLoading } = useSingleArticle(articleId);
  const { onClickDestroyButton } = useArticleFunction(articleId);

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
                  {data?.articles.image.url && <ImageModal data={data} />}
                  <CommentSet articleId={articleId} />
                </Box>
                <Box maxW="300px">
                  <ArticleUser data={data} />
                  <TagList />
                  <ButtonKit onOpen={onOpen} articleId={articleId} />
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
