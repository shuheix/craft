import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { useHistory } from "react-router-dom";
import { INDEX_ARTICLE_URL, NEW_ARTICLE_URL } from "../../constant/appHistory";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import AppLogo from "../common/AppLogo";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const goHome = () => {
    history.push(INDEX_ARTICLE_URL);
  };

  const goEdit = () => {
    history.push(NEW_ARTICLE_URL);
  };

  const { logout } = useAuth();

  return (
    <>
      <Box height="65px" px={5} w="100%" bgColor="gray.50">
        <Container maxW="container.xl" height="100%">
          <Flex
            alignItems="center"
            height="100%"
            justifyContent="space-between"
          >
            <Box flex={1}>
              <AppLogo goHome={goHome} />
              <Spacer />
            </Box>
            <Box flex={2}>
              <InputGroup>
                <InputLeftAddon children={<SearchIcon />} />
                <Input type="tel" placeholder="検索" />
              </InputGroup>
              <Spacer />
            </Box>
            <Box flex={1}>
              {currentUser ? (
                <Flex flexDirection="row" justifyContent="flex-end">
                  <Menu>
                    <MenuButton as={Button}>{currentUser?.email}</MenuButton>
                    <MenuList>
                      <MenuGroup>
                        <MenuItem>マイページ</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="Help">
                        <MenuItem onClick={logout}>ログアウト</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  <Button ml={4} onClick={goEdit}>
                    記事投稿
                  </Button>
                </Flex>
              ) : (
                <Flex justifyContent="flex-end">
                  <AuthModal />
                </Flex>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Header;
