import React, { VFC } from "react";

import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
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
      <Header />
      <Container maxW="container.xl">
        <Flex mt={4}>
          <Box flex="1" maxH="200px" mr={4} border="1px">
            <VStack>
              <UserAvatar size="lg" />
              <HStack h="30px">
                <Box>{data?.articles.length}</Box>
                <Spacer />
                <Box>{data?.favorite_articles.length}</Box>
                <Spacer />
                <Box>|</Box>
              </HStack>
            </VStack>
          </Box>
          <Box flex="3">
            <Tabs isLazy>
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
        </Flex>
      </Container>
    </>
  );
};

export default ShowUserPage;
