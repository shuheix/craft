import React, { useContext, useEffect, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SHOW_USERS_API, SINGLE_ARTICLE_API } from "../../constant/railsRoute";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { auth } from "../../firebase";
import DeleteArticleDialog from "../article/dialog/DeleteArticleDialog";
import { AuthContext } from "../../providers/AuthProvider";

const ShowArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(AuthContext);
  const cancelRef = React.useRef(null);
  const history = useHistory();
  const toast = useToast();

  const onClickEditButton = () => {
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
        .then((res) => {
          history.push(SHOW_USERS_API(userId));
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

  useEffect(() => {
    fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <p>error!</p>;

  return (
    <Container px={0} py={20} maxW="container.lg">
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
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
          <Flex flexDirection="column">
            {currentUser?.uid === uid ? (
              <>
                <Button
                  ml={3}
                  mb={3}
                  size="lg"
                  borderRadius="full"
                  p={0}
                  bgColor="white"
                  onClick={onClickEditButton}
                >
                  <EditIcon px={0} />
                </Button>
                <Button
                  ml={3}
                  mb={3}
                  size="lg"
                  borderRadius="full"
                  p={0}
                  bgColor="white"
                  onClick={onOpen}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  ml={3}
                  size="lg"
                  borderRadius="full"
                  p={0}
                  bgColor="white"
                ></Button>
              </>
            ) : (
              <Button
                ml={3}
                size="lg"
                borderRadius="full"
                p={0}
                bgColor="white"
              ></Button>
            )}
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default ShowArticleLayout;
