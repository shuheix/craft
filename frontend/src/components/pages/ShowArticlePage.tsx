import React, { VFC } from "react";
import {
  Box,
  Center,
  Container,
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
import { useResponsiveStyle } from "../../hooks/useResponsiveStyle";

const ShowArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, isError, isLoading } = useSingleArticle(articleId);
  const { onClickDestroyButton } = useArticleFunction(articleId);
  const { isLargerThan768, isLargerThan1024 } = useResponsiveStyle();

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
              {/* {isLargerThan768 || <ArticleUser data={data} />} */}
              <ShowArticleBody data={data} />
              {data?.articles.image.url && <ImageModal data={data} />}
              <CommentSet articleId={articleId} />
            </Box>
            {isLargerThan768 && (
              <Box w="300px">a</Box>
              // <Box mx={5} pr={5} w="300px">
              //   <ArticleUser data={data} />
              //   <TagList />
              //   <ButtonKit onOpen={onOpen} articleId={articleId} />
              // </Box>
            )}
          </Box>
        </Container>
        <DeleteArticleDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          onClickDestroyButton={onClickDestroyButton}
          title={data?.articles.title}
        />
      </Box>
    </>
  );
};

export default ShowArticlePage;
