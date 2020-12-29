import React, { useState } from "react";

import {
  Button,
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import {
  Info,
  Lock,
  Visibility,
  VisibilityOff,
  AccountCircleRounded,
} from "@material-ui/icons";

import { authStore } from "../../stores/authStore";

import axios from "axios";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
      width: "100%",
      textAlign: "center",
      boxSizing: "border-box",
    },
    input: {
      margin: theme.spacing(2),
    },
    link: {
      textDecoration: "none",
      color: "blue",
    },
  })
);

const Home = () => {
  const [alert, setAlert] = useState(<div></div>);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);
  const [username, setUsername] = useState("");
  const handleClickShowPassword = () => {
    setHide(!hide);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogin = async () => {
    const logins = {
      username: username,
      server_name: name,
      password: password,
    };
    await axios
      .post(String(process.env.REACT_APP_API_URL) + "/login", logins)
      .then((res) => {
        if (res.status === 200) {
          authStore.server = res.data;
          authStore.user = res.data.user[username];
          authStore.logIn();
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert(<div className={classes.input}>Falsche Anmeldedaten</div>);
      });
  };

  return (
    <main>
      <form className={classes.root}>
        <FormControl>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleRounded />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            placeholder="Benutzername"
          ></TextField>

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Info />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            placeholder="Friendstagram123"
          ></TextField>

          <TextField
            type={hide ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Password anzeigen/verstecken"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {hide ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            placeholder="Passwort123"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>

          <Button
            className={classes.input}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Jetzt Einloggen!
          </Button>
          {alert}
        </FormControl>
      </form>
    </main>
  );
};
export default inject("authStore")(observer(Home));
