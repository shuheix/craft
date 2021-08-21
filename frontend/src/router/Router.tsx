import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/header/Header";
import IndexArticlePage from "../components/pages/IndexArticlePage";
import LoginPage from "../components/pages/LoginPage";
import AuthProvider from "../providers/AuthProvider";
import ShowArticlePage from "../components/pages/ShowArticlePage";
import NewArticlePage from "../components/pages/NewArticlePage";
import EditArticlePage from "../components/pages/EditArticlePage";
import ShowUserPage from "../components/pages/ShowUserPage";
// import Page404 from "../components/pages/Page404";

const Router: VFC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Header />
        <Route exact path="/articles">
          <IndexArticlePage />
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
        <Route path="/users/:userId">
          <ShowUserPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/test"></Route>
        {/* <Route>
          <Page404 />
        </Route> */}
      </AuthProvider>
    </Switch>
  );
};

export default Router;
