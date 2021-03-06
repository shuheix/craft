import React, { VFC } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import AppLogo from "./AppLogo";
import EditIconButton from "./EditIconButton";
import { useAppHistory } from "../../hooks/useAppHistory";
import SearchGroup from "./SearchGroup";
import HeaderMenu from "./HeaderMenu";

const Header: VFC = () => {
  const { goHomePage } = useAppHistory();
  return (
    <>
      <Box height="65px" w="100%" bgColor="white" shadow="md">
        <Container maxW="container.xl" height="100%">
          <Flex
            alignItems="center"
            height="100%"
            justifyContent="space-between"
          >
            <Box flex={1}>
              <AppLogo goHome={goHomePage} />
            </Box>
            <Box flex={3}>
              <SearchGroup />
            </Box>
            <Box flex={1}>
              <HeaderMenu />
            </Box>
            <EditIconButton />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Header;
