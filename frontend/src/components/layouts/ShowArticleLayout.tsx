import React, { useEffect, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SHOW_USERS_API, SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
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
          history.push(SHOW_USERS_API(`${data?.articles.user_id}`));
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

  const { data, error, loading, fetchSingleArticle } = useFetchSingleArticle();

  const { register, handleSubmit } = useForm<Comment>();

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
      <Header />
      <Container px={0} py={20} maxW="container.lg">
        {loading ? (
          <Box>
            <Spinner />
          </Box>
        ) : (
          <>
            <Flex>
              <Box w="100%">
                <Box
                  w="100%"
                  bgColor="white"
                  boxShadow="xl"
                  borderRadius="2xl"
                  border="1px"
                  borderColor="gray.100"
                  mb={10}
                >
                  <Heading height="10vh" borderTopRadius="xl" p={5}>
                    {data?.articles.title}
                  </Heading>
                  <Text borderBottomRadius="xl" p={6} whiteSpace="pre-line">
                    {data?.articles.text}
                  </Text>
                </Box>
                <Box mb={5}>
                  <Heading size="md" pl={2} mb={1}>
                    コメント
                  </Heading>
                  <Divider colorScheme="whiteAlpha" />
                </Box>
                <Stack>
                  {data?.articles.comments.map((comment) => (
                    <HStack bgColor="white" borderRadius="md" key={comment.id}>
                      <Avatar />
                      <Stack>
                        <Heading />
                        <Text
                          borderBottomRadius="xl"
                          p={6}
                          whiteSpace="pre-line"
                        >
                          {comment.text}
                        </Text>
                      </Stack>
                    </HStack>
                  ))}
                </Stack>
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
    </>
  );
};

export default ShowArticleLayout;
