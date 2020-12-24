import React from "react";
import { inject, observer } from "mobx-react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

//stores

import { authStore } from "../../stores/authStore";

interface PostProps {
  image: string;
  title: string;
  subtitle: string;
  author: string;
  server: string;
  date: Date;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "50vw",
      maxWidth: "350px",
      minWidth: "50px",
      height: "auto",
      zIndex: 1,
      margin: " 0 auto 100px auto",
      display: "flex",
      flexDirection: "column",
      overflowWrap: "break-word",
      boxShadow: " 2px 4px 10px 2px #888888 ",
    },
    title: {
      width: "90%",
      margin: "auto",
      fontSize: "1.3em",
      borderBottom: "2px solid",
      marginBottom: "10px",
      padding: "10px",
    },
    subtitel: {
      width: "90%",
      margin: "auto",
      borderBottom: "1px solid",
      fontSize: "0.7em",
      padding: "10px",
    },
    author: {
      width: "90%",
      margin: "auto",
      fontSize: "0.6em",
      padding: "10px",
    },
    img: {
      width: "100%",
    },
  })
);

function PostContainer(props: PostProps) {
  const classes = useStyles();
  const dataURItoBlob = (dataURI: any) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    return bb;
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.title}
        style={{ borderBottomColor: authStore.server.user[props.author].color }}
      >
        {props.title}
      </div>
      <div>
        <img
          className={classes.img}
          src={URL.createObjectURL(dataURItoBlob(props.image))}
          alt="Auweh do klappt was ned"
        ></img>
      </div>
      <div
        className={classes.subtitel}
        style={{ borderBottomColor: authStore.server.user[props.author].color }}
      >
        {props.subtitle}
      </div>
      <div className={classes.author}>von {props.author}</div>
    </div>
  );
}

export default inject("mobileStore")(observer(PostContainer));
