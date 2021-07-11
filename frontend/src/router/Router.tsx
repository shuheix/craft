import { Container, Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import LeftAside from "../components/aside/LeftAside";
import RightAside from "../components/aside/RightAside";
import Header from "../components/header/Header";
import IndexArticlePage from "../components/pages/IndexArticlePage";
import LoginPage from "../components/pages/LoginPage";
import AuthProvider from "../providers/AuthProvider";
import ShowArticlePage from "../components/pages/ShowArticlePage";
import NewArticlePage from "../components/pages/NewArticlePage";

const Router: VFC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Header />
        <Route exact path="/">
          <Container maxW="container.xl">
            <Flex>
              <LeftAside />
              <IndexArticlePage />
              <RightAside />
            </Flex>
          </Container>
        </Route>
        <Route path="/article/:articleId">
          <ShowArticlePage />
        </Route>
        <Route path="/new">
          <NewArticlePage />
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
