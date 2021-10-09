import React, { VFC } from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Header from "../header/Header";
import UserImg from "../user/UserImg";
import UsersArticles from "../user/UserArticles";
import UsersFavoriteArticles from "../user/UserFavoriteArticles";

const ShowUserPage: VFC = () => {
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Flex mt={4}>
          <Box flex="1" bgColor="green.100" h="400px" mr={4}>
            <Flex flexDirection="column" mt={4} h="400px">
              <Box flex="4">
                <UserImg />
              </Box>
              <Box flex="1">status</Box>
              <Button flex="1">プロフ編集</Button>
            </Flex>
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
