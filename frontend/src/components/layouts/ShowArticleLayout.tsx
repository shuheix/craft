import React, { useEffect, VFC } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { SHOW_USERS_API, SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";
import axios from "axios";
import { auth } from "../../firebase";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import Header from "../header/Header";
import ButtonKit from "../article/ButtonKit";
import { useForm } from "react-hook-form";

const ShowArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const history = useHistory();
  const toast = useToast();

  const onClickEditButton = (): void => {
    history.push(`/articles/${articleId}/edit`);
  };

  const onClickDestroyButton = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      console.log(token);
      axios({
        method: "DELETE",
        url: `${SINGLE_ARTICLE_API(articleId)}`,
        data: { id: `${articleId}`, headers: { Authorization: token } },
      })
        .then(() => {
          history.push(SHOW_USERS_API(`${userId}`));
          toast({
            title: "削除しました",
            status: "success",
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast({
            title: "エラー",
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
    });
  };

  const {
    title,
    text,
    loading,
    error,
    uid,
    userId,
    fetchSingleArticle,
  } = useFetchSingleArticle();

  const { register, handleSubmit } = useForm<Comment>();

  type Comment = {
    text: string;
  };
  const onSubmit = (data: Comment) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios.post(
        `http://localhost:3000/api/v1/articles/${articleId}/comments`,
        {
          headers: { Authorization: token },
          text: data.text,
        }
      );
    });
  };

  useEffect(() => {
    fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <p>error!</p>;
  return (
    <>
      <Header />
      <Container px={0} py={20} maxW="container.lg">
        {loading ? (
          <Box>
            <Spinner />
          </Box>
        ) : (
          <>
            <Flex>
              <Box
                w="100%"
                bgColor="white"
                boxShadow="xl"
                borderRadius="2xl"
                border="1px"
                borderColor="gray.100"
              >
                <Heading height="10vh" borderTopRadius="xl" p={5}>
                  {title}
                </Heading>
                <Text borderBottomRadius="xl" p={6} whiteSpace="pre-line">
                  {text}
                </Text>
                <DeleteArticleDialog
                  leastDestructiveRef={cancelRef}
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                  onClickDestroyButton={onClickDestroyButton}
                  title={title}
                />
              </Box>
              <ButtonKit
                onOpen={onOpen}
                uid={uid}
                onClickEditButton={onClickEditButton}
              />
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                resize="none"
                mt={10}
                bgColor="white"
                row={15}
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
          </>
        )}
      </Container>
    </>
  );
};

export default ShowArticleLayout;
