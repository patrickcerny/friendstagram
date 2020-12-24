import React from "react";
import { inject, observer } from "mobx-react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

//stores
import { authStore } from "../../stores/authStore";

interface ChatMessageProps {
  author: string;
  text: string;
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
      fontWeight: 600,
    },
  })
);

function ChatMessage(props: ChatMessageProps) {
  const classes = useStyles();

  const getColorAuthor = () => {
    const user = authStore.server.user[props.author];
    console.log(authStore.server.user[props.author]);

    return { color: user.color, borderBottomColor: user.color };
  };

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
            : getColorAuthor()
        }
      >
        {props.author}
      </div>
      {props.text}
    </div>
  );
}

export default inject("mobileStore", "authStore")(observer(ChatMessage));
