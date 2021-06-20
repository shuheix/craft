import { Container, Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import LeftAside from "../components/aside/LeftAside";
import RightAside from "../components/aside/RightAside";
import Header from "../components/header/Header";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import AuthProvider from "../providers/AuthProvider";

const Router: VFC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Route exact path="/">
          <Container maxW="container.xl">
            <Header />
            <Flex>
              <LeftAside />
              <HomePage />
              <RightAside />
            </Flex>
          </Container>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/test"></Route>
      </AuthProvider>
    </Switch>
  );
};

export default Router;