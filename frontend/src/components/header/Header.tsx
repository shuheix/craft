import React, { useContext, VFC } from "react";
import {
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import AppLogo from "../common/AppLogo";
import EditIconButton from "./EditIconButton";
import { useAppHistory } from "../../hooks/useAppHistory";
import UserAvatar from "../user/UserAvatar";
import SearchGroup from "./SearchGroup";

const Header: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  const { goHomePage, goUserPage } = useAppHistory();
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
              <AppLogo goHome={goHomePage} />
              <Spacer />
            </Box>
            <Box flex={2}>
              <SearchGroup />
              <Spacer />
            </Box>
            <Box flex={1}>
              {currentUser ? (
                <Flex flexDirection="row" justifyContent="flex-end">
                  <Menu>
                    <MenuButton>
                      <UserAvatar size="md" />
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
