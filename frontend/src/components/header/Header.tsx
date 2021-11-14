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
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import AppLogo from "../common/AppLogo";
import EditIconButton from "./EditIconButton";
import { useAppHistory } from "../../hooks/useAppHistory";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const { goHomePage, goEditPage, goUserPage } = useAppHistory();
  const { logout } = useAuth();
  const history = useHistory();

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
              <AppLogo goHome={goHomePage} />
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
                      <MenuItem onClick={logout}>ログアウト</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Flex justifyContent="flex-end">
                  <AuthModal />
                </Flex>
              )}
            </Box>
            <EditIconButton />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Header;
