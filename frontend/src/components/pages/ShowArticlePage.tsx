import React, { VFC } from "react";
import {
  Box,
  Center,
  Container,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useArticleFunction } from "../../hooks/useArticleFunction";
import ShowArticleBody from "../article/body/ShowArticleBody";
import ButtonKit from "../article/aside/ButtonKit";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import TagList from "../article/tag/TagList";
import Header from "../header/Header";
import ArticleUser from "../article/aside/ArticleUser";
import CommentList from "../article/comment/CommentList";
import { useSingleArticle } from "../../hooks/fetch/useSingleArticle";
import ImageModal from "../article/modal/ImageModal";
import { useResponsiveStyle } from "../../hooks/useResponsiveStyle";

const ShowArticlePage: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, isError, isLoading } = useSingleArticle();
  const { onClickDestroyButton } = useArticleFunction();
  const { isLargerThan768 } = useResponsiveStyle();

  if (isError) return <p>error!</p>;
  if (isLoading)
    return (
      <>
        <Center>
          <Spinner />
        </Center>
      </>
    );
  return (
    <>
      <Box bgColor="teal.50" minH="100vh">
        <Header />
        <Container py={10} maxW="container.xl">
          <Box display={{ md: "flex" }}>
            <Box w="100%">
              {isLargerThan768 || <ArticleUser />}
              <ShowArticleBody />
              <ImageModal />
              <CommentList />
            </Box>
            {isLargerThan768 && (
              <Box mx={5} pr={5} w="350px">
                <ArticleUser />
                <TagList />
                <ButtonKit onOpen={onOpen} />
              </Box>
            )}
          </Box>
        </Container>
        <DeleteArticleDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          onClickDestroyButton={onClickDestroyButton}
          title={data?.article.title}
        />
      </Box>
    </>
  );
};

export default ShowArticlePage;
