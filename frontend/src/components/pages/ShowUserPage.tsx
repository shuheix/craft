import React, { VFC } from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Header from "../header/Header";
import UsersArticles from "../user/UserArticles";
import UsersFavoriteArticles from "../user/UserFavoriteArticles";
import UserAvatar from "../user/UserAvatar";
import AvatarModal from "../user/AvatarModal";

const ShowUserPage: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Flex mt={4}>
          <Box flex="1" h="400px" mr={4} border="1px">
            <VStack>
              <UserAvatar />
              <Box>status</Box>
              <Button onClick={onOpen}>プロフ編集</Button>
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <AvatarModal />
                </ModalContent>
              </Modal>
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
