import React from "react";
import { AppBar, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HomeRounded, ChatRounded, AddRounded, Chat } from "@material-ui/icons";

//stores
import { mobileStore } from "../../stores/mobileStore";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles({
  root: {
    zIndex: 9999,
  },
  navBarContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  links: {
    color: "white",
  },
  headerMobile: {
    textAlign: "center",
  },
});

function NavBar() {
  const classes = useStyles();

  if (mobileStore.isMobile) {
    return (
      <AppBar position="fixed" color="primary" className={classes.root}>
        <IconButton color="inherit">
          <Link to="/">
            <HomeRounded />
          </Link>
        </IconButton>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="fixed" color="primary" className={classes.root}>
        <Grid container>
          <Grid item xs={6} sm={8} md={9} lg={10}>
            <Link to="/" className={classes.links}>
              <IconButton color="inherit">
                <ChatRounded />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Grid container>
              <Grid item xs={4}>
                <Link to="/home" className={classes.links}>
                  <IconButton color="inherit">
                    <HomeRounded />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/chat" className={classes.links}>
                  <IconButton color="inherit">
                    <Chat />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/post" className={classes.links}>
                  <IconButton color="inherit">
                    <AddRounded />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}
export default inject("mobileStore")(observer(NavBar));
