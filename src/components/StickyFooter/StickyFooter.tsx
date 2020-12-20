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
import {
  HomeRounded,
  AddRounded,
  ChatRounded,
  AccountBoxRounded,
  FlashOnRounded,
} from "@material-ui/icons";

//stores
import { mobileStore } from "../../stores/mobileStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      position: "fixed",
      bottom: "0",
      borderTop: "1px solid ",
      borderColor: theme.palette.primary.main,
      zIndex: 9999,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -20,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  })
);

function StickyFooter() {
  const classes = useStyles();
  const [stickyFooterValue, setStickyFooterValue] = React.useState("recents");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setStickyFooterValue(newValue);
  };
  if (mobileStore.isMobile) {
    return (
      <BottomNavigation
        value={stickyFooterValue}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigation
          value={stickyFooterValue}
          onChange={handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Home"
            value="Home"
            icon={<HomeRounded />}
            component={Link}
            to="/home"
          />

          <BottomNavigationAction
            label="Posten"
            value="Profile"
            icon={<AddRounded />}
            component={Link}
            to="post"
          />
          <BottomNavigationAction
            label="Chat"
            value="Chat"
            icon={<ChatRounded />}
            component={Link}
            to="chat"
          />
        </BottomNavigation>
      </BottomNavigation>
    );
  } else {
    return null;
  }
}

export default inject("mobileStore")(observer(StickyFooter));
