import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import {
  Button,
  createStyles,
  FormControl,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import axios from "axios";

import { authStore } from "../../stores/authStore";

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
      textAlign: "center",
      margin: "auto",
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
    image: {
      margin: "20px auto",
      height: "100px",
      alignSelf: "center",
    },
  })
);

const Chat = () => {
  const history = useHistory();
  const classes = useStyles();
  const [file, setFile] = useState<File>(new File([], ""));
  const [fileWasUploaded, setFileWasUploaded] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      if (fileReader !== null) {
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const handleFileSelected = async (e: any) => {
    await setFile(e.target.files[0]);
    await setFileWasUploaded(true);
    await setImageURL(String(await convertBase64(file)));

    if (title.length !== 0 && fileWasUploaded) {
      setButtonEnabled(false);
    }
  };

  const handleClick = async () => {
    var encodedImage = String(await convertBase64(file));

    const body = {
      image: encodedImage,
      title: title,
      subtitle: subTitle,
      author: authStore.user.username,
      server: authStore.server.server_name,
    };

    await axios
      .post(String(process.env.REACT_APP_API_URL) + "/uploadpost", body)
      .then((res) => {
        console.log("geschickt");
      })
      .catch((err) => {
        console.log(err);
      });

    history.push("/");
  };

  return (
    <>
      <StickyFooter></StickyFooter>
      <form className={classes.root}>
        <FormControl>
          <TextField
            className={classes.input}
            value={title}
            InputLabelProps={{ shrink: true }}
            placeholder="Überschrift"
            onChange={(e) => {
              setTitle(e.target.value);
              if (title.length > 0 && fileWasUploaded) {
                setButtonEnabled(false);
              }
            }}
          ></TextField>

          <TextField
            multiline
            className={classes.input}
            value={subTitle}
            InputLabelProps={{ shrink: true }}
            placeholder="Untertitel"
            onChange={(e) => {
              setSubTitle(e.target.value);
            }}
          ></TextField>

          <Button variant="contained" component="label">
            Datei Hochladen
            <input type="file" hidden onChange={handleFileSelected} />
          </Button>
          <img src={imageURL} alt="(Dein Foto)" className={classes.image} />
          <Button
            disabled={buttonEnabled}
            className={classes.input}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Post Hochladen!
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default Chat;
