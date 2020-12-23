import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import axios from "axios";

import { mobileStore } from "../../stores/mobileStore";
import StickyFooter from "../../components/StickyFooter/StickyFooter";
import { inject, observer } from "mobx-react";
import { authStore } from "../../stores/authStore";
import PostContainer from "../../components/Post/PostContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
    botnav: {
      left: 0,
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const body = {
        server: authStore.server.server_name,
      };
      await axios
        .post(String(process.env.REACT_APP_API_URL) + "/posts", body)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  return (
    <main className={classes.root}>
      <StickyFooter></StickyFooter>
      {posts.map((item) => {
        return (
          <PostContainer
            title={item.title}
            author={item.author}
            server={item.server}
            image={item.image}
            subtitle={item.subtitle}
            date={item.date}
          ></PostContainer>
        );
      })}
    </main>
  );
};

export default inject("authStore")(observer(Home));
