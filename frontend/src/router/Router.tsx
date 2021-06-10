import { Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import LeftAside from "../components/aside/LeftAside";
import RightAside from "../components/aside/RightAside";
import Header from "../components/header/Header";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";

const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Header />
        <Flex>
          <LeftAside />
          <HomePage />
          <RightAside />
        </Flex>
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
};

export default Router;
