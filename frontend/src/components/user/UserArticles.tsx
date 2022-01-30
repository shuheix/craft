import React, { useContext } from "react";

import {
  Stack,
  Box,
  Heading,
  Spinner,
  Center,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { SHOW_ARTICLE_URL } from "../../constant/appHistory";
import { useUser } from "../../hooks/fetch/useUser";
import { useHistory, useParams } from "react-router-dom";
import EditArticleButton from "../ui/button/EditArticleButton";
import DeleteArticleButton from "../ui/button/DeleteArticleButton";
import { AuthContext } from "../../providers/AuthProvider";

const UserArticles = () => {
  const history = useHistory();
  const { uid } = useParams<{ uid: string }>();
  const { data, isError, isLoading } = useUser(uid);
  const { currentUser } = useContext(AuthContext);
  if (isError) return <p>読み込みに失敗しました。</p>;
  if (isLoading) return <Spinner />;
  if (data?.user.articles?.length === 0)
    return (
      <Center>
        <p>まだ、投稿はありません。</p>
      </Center>
    );

  return (
    <Stack spacing={5}>
      {data?.user?.articles.map((article) => (
        <HStack key={article.id}>
          <Box
            flexGrow={1}
            bgColor="white"
            shadow="md"
            px={5}
            py={8}
            onClick={() => history.push(SHOW_ARTICLE_URL(article.id))}
            _hover={{
              boxShadow: "lg",
              cursor: "pointer",
            }}
            borderRadius="lg"
            data-cy="article"
          >
            <Heading fontSize="xl">{article.title}</Heading>
          </Box>
          {currentUser?.uid === article.uid && (
            <VStack>
              <EditArticleButton
                articleId={article.id}
                data-cy="editIconButton"
              />
              <DeleteArticleButton
                article={article}
                data-cy="deleteIconButton"
              />
            </VStack>
          )}
        </HStack>
      ))}
    </Stack>
  );
};

export default UserArticles;
