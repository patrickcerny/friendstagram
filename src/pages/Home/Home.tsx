import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Button,
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import { Info, Lock, Visibility, VisibilityOff } from "@material-ui/icons";

import { mobileStore } from "../../stores/mobileStore";
import { error } from "console";
import StickyFooter from "../../components/StickyFooter/StickyFooter";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Home = () => {
  // await axios
  //   .post("http://localhost:3001/post")
  //   .then((res) => {})
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <main>
      <StickyFooter></StickyFooter>
    </main>
  );
};

export default inject("authStore")(observer(Home));
