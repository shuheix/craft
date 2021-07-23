import React, { useEffect, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { articleApi } from "../../constant/railsRoute";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFetchSingleArticle } from "../../hooks/useFetchSingleArticle";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { auth } from "../../firebase";

const ShowArticleLayout: VFC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const history = useHistory();

  const onClickEditButton = () => {
    history.push(`/articles/${articleId}/edit`);
  };

  const onClickDestroyButton = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      console.log(token);
      axios({
        method: "DELETE",
        url: `${articleApi(articleId)}`,
        headers: { Authorization: token },
        data: { id: `${articleId}` },
      });
    });
  };

  const {
    title,
    text,
    loading,
    error,
    fetchSingleArticle,
  } = useFetchSingleArticle();

  useEffect(() => {
    fetchSingleArticle(articleApi(articleId));
  }, [articleId, fetchSingleArticle]);

  if (error) return <p>error!</p>;

  return (
    <Container px={0} py={20}>
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
            <Heading height="20vh" borderTopRadius="xl">
              {title}
            </Heading>
            <Text minHeight="60vh" borderBottomRadius="xl">
              {text}
            </Text>
          </Box>
          <Box>
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
              size="lg"
              borderRadius="full"
              p={0}
              bgColor="white"
              onClick={onClickDestroyButton}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default ShowArticleLayout;
