import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";

function Layouts({ children }) {
  return (
    <div>
      <Head>
        <title>WalesEcom</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>WalesEcom</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
}

export default Layouts;
