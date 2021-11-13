import React, { useContext, useState, VFC } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { INDEX_ARTICLE_URL, NEW_ARTICLE_URL } from "../../constant/appHistory";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import AppLogo from "../common/AppLogo";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const goHome = () => {
    history.push(INDEX_ARTICLE_URL);
  };

  const goEdit = () => {
    history.push(NEW_ARTICLE_URL);
  };

  const goUserPage = () => {
    const uid = currentUser?.uid;
    history.push(`/users/${uid}`);
  };

  const searchArticle = () => {
    if (searchInput === "") return;
    history.push(`/articles/search?title=${searchInput}`);
  };

  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput !== "") {
      history.push(`/articles/search?title=${searchInput}`);
    }
  };

  const inputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
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
                <Input
                  placeholder="検索"
                  value={searchInput}
                  onChange={inputData}
                  onKeyPress={pressEnterKey}
                />
                <InputRightElement>
                  <Button size="md" onClick={searchArticle}>
                    検索
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Spacer />
            </Box>
            <Box flex={1}>
              {currentUser ? (
                <Flex flexDirection="row" justifyContent="flex-end">
                  <Menu>
                    <MenuButton as={Button}>
                      {currentUser.displayName}
                    </MenuButton>
                    <MenuList>
                      <MenuGroup>
                        <MenuItem onClick={goUserPage}>マイページ</MenuItem>
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
