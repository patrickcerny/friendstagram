import React, { useEffect, useRef, useState } from "react";

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
import {
  ClassSharp,
  Info,
  Lock,
  SendOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

import { authStore } from "../../stores/authStore";

import { mobileStore } from "../../stores/mobileStore";

import ChatMessage from "../../components/ChatMessage/ChatMessage";
import { inject, observer } from "mobx-react";
import { join } from "path";
const io = require("socket.io-client");

var socket = io("http://localhost:3001");

interface IMessage {
  author: string;
  text: string;
  date: Date;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "90vh",
      boxSizing: "border-box",
      flexDirection: "column",
      alignContent: "stretch",
      display: "flex",
    },
    messageContainer: {
      overflowY: "scroll",
      flexGrow: 1,
    },
    textElements: {
      height: "70px",
      backgroundColor: "transparent",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      zIndex: 9999,
    },
    textfield: {
      width: "65%",
      marginLeft: "5%",
      borderWidth: "2px",
      borderColor: theme.palette.secondary.main,
      borderRadius: "10px",
      padding: "10px",
    },
    submit: {
      width: "20%",
      marginLeft: "5%",
    },
  })
);
let oldMessagesFound = false;
const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const messageWindow = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    if (!oldMessagesFound) {
      axios
        .post(String(process.env.REACT_APP_API_URL) + "/chat", {
          server_name: authStore.server.server_name,
        })
        .then((res) => {
          let oldMessages = res.data;
          setMessages(oldMessages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    oldMessagesFound = true;
  });

  const handleClickSumbit = async () => {
    await socket.emit("message", {
      author: authStore.user.username,
      text: input,
      server: "wg",
    });
    setInput("");
  };
  socket.on("newMessage", (newMessage: IMessage) => {
    let joined = messages.concat(newMessage);
    setMessages(joined);
    messageWindow.current.scrollTo({
      top: messageWindow.current.scrollHeight + 40,
      behavior: "smooth",
    });
  });
  return (
    <main className={classes.root}>
      <div className={classes.messageContainer} ref={messageWindow}>
        {messages.map((item) => {
          return <ChatMessage text={item.text} author={item.author} />;
        })}
      </div>
      <div className={classes.textElements}>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClickSumbit();
            }
          }}
          value={input}
          type="text"
          className={classes.textfield}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleClickSumbit}
        >
          <SendOutlined></SendOutlined>
        </Button>
      </div>
    </main>
  );
};
export default inject("authStore")(observer(Chat));
