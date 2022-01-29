import React, { useContext, VFC } from "react";

import {
  Box,
  Center,
  Container,
  Heading,
  VStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import Header from "../header/Header";
import UsersArticles from "../user/UserArticles";
import UsersFavoriteArticles from "../user/UserFavoriteArticles";
import UserAvatar from "../user/UserAvatar";
import { useUser } from "../../hooks/fetch/useUser";
import { useHistory, useParams } from "react-router-dom";
import { EDIT_USER_URL } from "../../constant/appHistory";
import { AuthContext } from "../../providers/AuthProvider";

const ShowUserPage: VFC = () => {
  const { uid } = useParams<{ uid: string }>();
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const { data, isError, isLoading } = useUser(uid);
  if (isError) return <p>error</p>;
  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return (
    <>
      <Box bgColor="teal.50" minH="100vh">
        <Header />
        <Container maxW="container.xl">
          <VStack my={5} ml={5} spacing={5}>
            <HStack w="100%" justifyContent="space-between">
              <HStack>
                <UserAvatar
                  size="2xl"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                  src={data?.user.avatar.url}
                />
                <Text
                  alignSelf="self-start"
                  justifySelf="self-start"
                  pt={5}
                  pl={5}
                >
                  {data?.user.profile}
                </Text>
              </HStack>
              {data?.user.uid === currentUser?.uid && (
                <Button
                  alignSelf="flex-start"
                  variant="outline"
                  bgColor="white"
                  shadow="sm"
                  onClick={() => history.push(EDIT_USER_URL(uid))}
                >
                  プロフィール編集
                </Button>
              )}
            </HStack>
            <Heading size="sm" alignSelf="self-start" px={1}>
              {data?.user.name}
            </Heading>
          </VStack>
          <Box w="100%">
            <Tabs isLazy w="100%">
              <TabList>
                <Tab>投稿した質問</Tab>
                <Tab>ブックマークした投稿</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UsersArticles />
                </TabPanel>
                <TabPanel>
                  <UsersFavoriteArticles />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ShowUserPage;
