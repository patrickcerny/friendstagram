import React from "react";
import { inject, observer } from "mobx-react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HomeRounded, AddRounded, ChatRounded } from "@material-ui/icons";

//stores
import { mobileStore } from "../../stores/mobileStore";
import { authStore } from "../../stores/authStore";

interface ChatMessageProps {
  author: String;
  text: String;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "40%",
      maxWidth: "40%",
      padding: "10px",
      margin: "10px",
      borderRadius: "15px",
      backgroundColor: theme.palette.primary.main,
      overflowWrap: "break-word",
      boxShadow: " 2px 4px 10px 2px #888888 ",
    },
    author: {
      width: "80%",
      borderBottom: "1px solid white",
      paddingBottom: "4px",
    },
  })
);

function ChatMessage(props: ChatMessageProps) {
  const classes = useStyles();

  return (
    <div
      style={
        props.author === authStore.user.username
          ? { backgroundColor: "#2360c2", color: "white" }
          : { backgroundColor: "white" }
      }
      className={classes.root}
    >
      <div
        className={classes.author}
        style={
          props.author === authStore.user.username
            ? { color: "white" }
            : { color: "#2360c2", borderBottomColor: "black" }
        }
      >
        {props.author}
      </div>
      {props.text}
    </div>
  );
}

export default inject("mobileStore", "authStore")(observer(ChatMessage));
