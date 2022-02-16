import React, { useContext } from "react";

import {
  Stack,
  Box,
  Heading,
  Spinner,
  Center,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useUser } from "../../hooks/fetch/useUser";
import { useParams } from "react-router-dom";
import EditArticleButton from "../ui/button/EditArticleButton";
import DeleteArticleButton from "../ui/button/DeleteArticleButton";
import { AuthContext } from "../../providers/AuthProvider";
import { CalendarIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import AnswerdStateTag from "../article/tag/AnswerdStateTag";
import UserAvatar from "./UserAvatar";
import { useAppHistory } from "../../hooks/useAppHistory";

const UserArticles = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data, isError, isLoading } = useUser(uid);
  const { currentUser } = useContext(AuthContext);
  const { goShowArticlePage } = useAppHistory();

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
            w="100%"
            key={article.id}
            onClick={() => goShowArticlePage(article.id)}
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
              <UserAvatar src={article.avatar} />
              <VStack spacing={2} flexGrow={1}>
                <HStack justifyContent="space-between" w="100%">
                  <Heading size="xs" alignSelf="flex-start" mr={4}>
                    <Icon as={CalendarIcon} mr={1} />
                    {dayjs(article.created_at).format("YYYY年MM月DD日")}
                  </Heading>
                  <AnswerdStateTag is_answerd={article.is_answerd} />
                </HStack>
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
