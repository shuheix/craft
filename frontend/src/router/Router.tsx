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
import EditArticlePage from "../components/pages/EditArticlePage";

const Router: VFC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Header />
        <Route exact path="/articles">
          <Container maxW="container.xl">
            <Flex>
              <LeftAside />
              <IndexArticlePage />
              <RightAside />
            </Flex>
          </Container>
        </Route>
        <Route path="/articles/new">
          <NewArticlePage />
        </Route>
        <Route exact path="/articles/:articleId(\d+)">
          <ShowArticlePage />
        </Route>
        <Route path="/articles/:articleId/edit">
          <EditArticlePage />
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
