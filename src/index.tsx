import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as StoreProvider } from "mobx-react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
// stores
import { authStore } from "./stores/authStore";
import { mobileStore } from "./stores/mobileStore";

const stores = {
  authStore,
  mobileStore,
};

//theme for material UI
let theme = createMuiTheme({
  typography: { fontSize: 12, fontFamily: "Roboto" },
  palette: {
    primary: {
      main: "#2360c2",
    },
    secondary: {
      main: "#5b92eb",
    },
    error: {
      main: "#8f0909",
    },
  },
});

// dotenv
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider {...stores}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
