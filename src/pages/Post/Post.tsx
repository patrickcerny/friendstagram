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

import { authStore } from "../../stores/authStore";

import { mobileStore } from "../../stores/mobileStore";
import { error } from "console";
import StickyFooter from "../../components/StickyFooter/StickyFooter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
      width: "80vw",
      margin: "auto",
      textAlign: "center",
      boxSizing: "border-box",
    },
    input: {
      margin: " 20px auto ",
      width: "100%",
    },
    link: {
      textDecoration: "none",
      color: "blue",
    },
  })
);

const Chat = () => {
  const classes = useStyles();

  return (
    <>
      <StickyFooter></StickyFooter>
      <form className={classes.root}>
        <FormControl>
          <TextField
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            placeholder="Überschrift"
          ></TextField>

          <TextField
            multiline
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            placeholder="Untertitel"
          ></TextField>

          <Button variant="contained" component="label">
            Datei Hochladen
            <input type="file" hidden />
          </Button>

          <Button className={classes.input} variant="contained" color="primary">
            Post Hochladen!
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default Chat;
