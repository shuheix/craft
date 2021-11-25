import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useAppHistory } from "../../hooks/useAppHistory";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import AuthModal from "../auth/AuthModal";
import UserAvatar from "../user/UserAvatar";

const HeaderMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const { goUserPage } = useAppHistory();
  const { logout } = useAuth();

  return (
    <>
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
    </>
  );
};

export default HeaderMenu;
