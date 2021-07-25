import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { useHistory } from "react-router-dom";
import { indexURI } from "../../constant/railsRoute";
import AuthModal from "../auth/AuthModal";
import AppLogo from "../common/AppLogo";
import UserImg from "../user/UserImg";

const Header: VFC = () => {
  const history = useHistory();
  const goHome = () => {
    history.push(indexURI);
  };

  return (
    <>
      <Box height="65px" px={5} w="100%" bgColor="gray.50">
        <Container maxW="container.xl" height="100%">
          <Flex alignItems="center" height="100%">
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
              <Flex justifyContent="flex-end">
                <UserImg />
                <AuthModal />
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Header;
