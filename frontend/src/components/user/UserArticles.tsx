import React from "react";

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
import { useHistory } from "react-router-dom";
import EditArticleButton from "../ui/button/EditArticleButton";
import DeleteArticleButton from "../ui/button/DeleteArticleButton";

const UserArticles = () => {
  const { data, isError, isLoading } = useUser();
  const history = useHistory();

  if (isError) return <p>読み込みに失敗しました。</p>;
  if (isLoading) return <Spinner />;
  if (data?.articles?.length === 0)
    return (
      <Center>
        <p>まだ、投稿はありません。</p>
      </Center>
    );

  return (
    <Stack spacing={5}>
      {data?.articles?.map((article) => (
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
          >
            <Heading fontSize="xl">{article.title}</Heading>
          </Box>
          <VStack>
            <EditArticleButton articleId={article.id} />
            <DeleteArticleButton article={article} />
          </VStack>
        </HStack>
      ))}
    </Stack>
  );
};

export default UserArticles;
