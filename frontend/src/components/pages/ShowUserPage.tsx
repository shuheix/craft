import React, { VFC } from "react";

import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Header from "../header/Header";
import UsersArticles from "../user/UserArticles";
import UsersFavoriteArticles from "../user/UserFavoriteArticles";
import UserAvatar from "../user/UserAvatar";
import { useUser } from "../../hooks/fetch/useUser";

const ShowUserPage: VFC = () => {
  const { data, isError, isLoading } = useUser();
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
          <HStack my={5} ml={5}>
            <UserAvatar size="2xl" />
            <Heading size="sm" alignSelf="flex-start" pt={3} pl={3}>
              {data?.user.name}
            </Heading>
          </HStack>
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
