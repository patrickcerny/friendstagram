import React from "react";
import "./App.scss";

import { authStore } from "./stores/authStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import { mobileStore } from "./stores/mobileStore";
import NavBar from "./components/NavBar/NavBar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import Post from "./pages/Post/Post";
import { inject, observer } from "mobx-react";

const pages = {
  home: Home,
  login: Login,
  chat: Chat,
  post: Post,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      right: 30,
      top: 70,
    },
  })
);

//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
const App = () => {
  if (!authStore.user || !authStore.server) {
    authStore.logOut();
  }

  const classes = useStyles();
  if (window.innerWidth <= 600) {
    mobileStore.setMobile(true);
  }
  const handleLogOut = () => {
    authStore.logOut();
    authStore.user = null;
  };

  if (authStore.loggedIn) {
    return (
      <Router>
        <NavBar></NavBar>
        <main>
          <Fab
            onClick={handleLogOut}
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.fab}
          >
            <ExitToAppIcon></ExitToAppIcon>
          </Fab>
          <Switch>
            <Route
              exact
              path="/home"
              component={() => <pages.home></pages.home>}
            ></Route>
            <Route
              exact
              path="/chat"
              component={() => <pages.chat></pages.chat>}
            ></Route>
            <Route
              exact
              path="/post"
              component={() => <pages.post></pages.post>}
            ></Route>
            <Route
              exact
              path="/"
              component={() => <Redirect to="/home"></Redirect>}
            ></Route>
            <Route
              path="/"
              component={() => <Redirect to="/"></Redirect>}
            ></Route>
          </Switch>
        </main>
      </Router>
    );
  } else {
    return (
      <Router>
        {/*Wenn der User noch nicht eingeloggt ist muss ein ladescreen gezeitgt werden, bevor content gerendert wird */}
        <NavBar />

        {/*des muss unbeding no geändert werra*/}
        <main style={{ marginTop: "60px" }}>
          <Switch>
            <Route
              exact
              path="/login"
              component={() => <pages.login></pages.login>}
            ></Route>

            <Route
              path="/"
              component={() => <Redirect to="/login"></Redirect>}
            ></Route>
          </Switch>
        </main>
      </Router>
    );
  }
};
export default inject("authStore", "mobileStore")(observer(App));
