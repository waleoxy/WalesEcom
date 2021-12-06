import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import { myStyles } from "./utils/styles";

function Layouts({ children }) {
  const classes = myStyles();

  return (
    <div>
      <Head>
        <title>WalesEcom</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>WalesEcom</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved</Typography>
      </footer>
    </div>
  );
}

export default Layouts;
