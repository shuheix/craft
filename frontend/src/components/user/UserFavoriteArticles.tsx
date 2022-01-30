import React from "react";

import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { SHOW_ARTICLE_URL } from "../../constant/appHistory";
import { useUser } from "../../hooks/fetch/useUser";
import { CalendarIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";

const UserFavoriteArticles = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data, isError, isLoading } = useUser(uid);
  const history = useHistory();

  if (isError) return <p>読み込みに失敗しました。</p>;
  if (isLoading) return <Spinner />;
  if (data?.favorite_articles?.length === 0)
    return (
      <Center>
        <Text>ブックマークした投稿はありません。</Text>
      </Center>
    );

  return (
    <Stack spacing={4}>
      <Stack spacing={4}>
        {data?.favorite_articles?.map((article) => (
          <Box
            key={article.id}
            onClick={() => history.push(SHOW_ARTICLE_URL(article.id))}
            boxShadow="md"
            _hover={{
              cursor: "pointer",
              boxShadow: "xl",
            }}
            height="100px"
            bgColor="white"
            borderRadius="xl"
          >
            <HStack h="100%" px={4}>
              <VStack spacing={2} flexGrow={1}>
                <Heading size="xs" alignSelf="flex-start" mr={4}>
                  <Icon as={CalendarIcon} mr={1} />
                  {dayjs(article.created_at).format("YYYY年MM月DD日")}
                </Heading>
                <Heading
                  size="sm"
                  maxWidth="100%"
                  alignSelf="flex-start"
                  ml={4}
                >
                  {article.title}
                </Heading>
              </VStack>
            </HStack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default UserFavoriteArticles;
