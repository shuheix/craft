import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import IndexArticlePage from "../components/pages/IndexArticlePage";
import LoginPage from "../components/pages/LoginPage";
import AuthProvider from "../providers/AuthProvider";
import ShowArticlePage from "../components/pages/ShowArticlePage";
import NewArticlePage from "../components/pages/NewArticlePage";
import EditArticlePage from "../components/pages/EditArticlePage";
import ShowUserPage from "../components/pages/ShowUserPage";
import EditUserPage from "../components/pages/EditUserPage";
import SearchArticlePage from "../components/pages/SearchArticlePage";

const Router: VFC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Route exact path="/">
          <IndexArticlePage />
        </Route>
        <Route exact path="/articles">
          <IndexArticlePage />
        </Route>
        <Route path="/articles/new">
          <NewArticlePage />
        </Route>
        <Route path="/articles/search">
          <SearchArticlePage />
        </Route>
        <Route exact path="/articles/:articleId(\d+)">
          <ShowArticlePage />
        </Route>
        <Route path="/articles/:articleId/edit">
          <EditArticlePage />
        </Route>
        <Route exact path="/users/:uid">
          <ShowUserPage />
        </Route>
        <Route path="/users/:uid/edit">
          <EditUserPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        {/* <Route>
          <Page404 />
        </Route> */}
      </AuthProvider>
    </Switch>
  );
};

export default Router;
