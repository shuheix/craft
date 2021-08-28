import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, VFC } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import { auth } from "../../firebase";
import { useArticle } from "../../hooks/useArticle";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";
import ShowArticleBody from "../article/body/ShowArticleBody";
import ButtonKit from "../article/ButtonKit";
import CommentList from "../article/comment/CommentList";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import Header from "../header/Header";

const ArticlePage: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, error, loading, fetchSingleArticle } = useFetchSingleArticle();
  const { register, handleSubmit } = useForm<Comment>();
  const { onClickDestroyButton, onClickEditButton } = useArticle(
    articleId,
    data
  );

  type Comment = {
    text: string;
  };
  const onSubmit = (data: Comment) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(`http://localhost:3000/api/v1/articles/${articleId}/comments`, {
          headers: { Authorization: token },
          text: data.text,
        })
        .then(() => {
          fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
        });
    });
  };

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
              <Spinner />
            </>
          ) : (
            <>
              <Flex>
                <Box w="100%">
                  <ShowArticleBody data={data} />
                  <CommentList data={data} />
                  <Box mt={10}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Textarea
                        resize="none"
                        bgColor="white"
                        row={20}
                        boxShadow="sm"
                        id="text"
                        borderRadius="2xl"
                        pr={10}
                        {...register("text", {
                          required: "内容が記載されていません",
                          maxLength: {
                            value: 1000,
                            message: "コメントは最大1000文字までです",
                          },
                        })}
                      />
                      <Button type="submit">投稿</Button>
                    </form>
                  </Box>
                </Box>
                <ButtonKit
                  onOpen={onOpen}
                  uid={data?.articles.user.uid}
                  onClickEditButton={onClickEditButton}
                />
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
