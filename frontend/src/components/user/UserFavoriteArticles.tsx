import React from "react";

import { Box, Center, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../hooks/fetchAPI/useUser";
import { SHOW_ARTICLE_URL } from "../../constant/appHistory";

const UserFavoriteArticles = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data, isError, isLoading } = useUser(uid);
  const history = useHistory();

  if (isError) return <p>読み込みに失敗しました。</p>;
  if (isLoading) return <Spinner />;
  if (data?.favorite_articles?.length === 0)
    return (
      <Center>
        <p>ブックマークした投稿はありません。</p>
      </Center>
    );

  return (
    <Stack spacing={4}>
      <Stack spacing={4}>
        {data?.favorite_articles?.map((articles) => (
          <Box
            shadow="md"
            p={5}
            borderWidth={1}
            key={articles.id}
            onClick={() => history.push(SHOW_ARTICLE_URL(articles.id))}
            _hover={{
              boxShadow: "lg",
              cursor: "pointer",
            }}
            borderRadius="lg"
          >
            <Heading fontSize="xl">{articles.title}</Heading>
            <Text>{articles.text}</Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default UserFavoriteArticles;
