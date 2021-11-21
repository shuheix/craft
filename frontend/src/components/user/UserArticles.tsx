import React from "react";

import { Stack, Box, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import { SHOW_ARTICLE_URL } from "../../constant/appHistory";
import { useUser } from "../../hooks/fetch/useUser";
import { useHistory } from "react-router-dom";

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
    <Stack spacing={4}>
      <Stack spacing={4}>
        {data?.articles?.map((articles) => (
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

export default UserArticles;
