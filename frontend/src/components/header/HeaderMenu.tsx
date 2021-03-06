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
import { useUser } from "../../hooks/fetch/useUser";
import { useAppHistory } from "../../hooks/useAppHistory";
import { useAuth } from "../../hooks/useAuth";
import AuthModal from "./auth/AuthModal";
import UserAvatar from "../user/UserAvatar";
import { AuthContext } from "../../providers/AuthProvider";

const HeaderMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser?.uid;
  const { data } = useUser(uid);
  const { goUserPage } = useAppHistory();
  const { logout } = useAuth();

  return (
    <>
      {currentUser ? (
        <Flex flexDirection="row" justifyContent="flex-end">
          <Menu>
            <MenuButton data-cy="menu-button">
              <UserAvatar size="md" src={data?.user.avatar.url} />
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem onClick={goUserPage} data-cy="my-page">
                  マイページ
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={logout} data-cy="logout">
                ログアウト
              </MenuItem>
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
