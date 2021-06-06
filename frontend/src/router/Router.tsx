import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";

const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
};

export default Router;
