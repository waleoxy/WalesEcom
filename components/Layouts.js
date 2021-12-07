import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import { myStyles } from "./utils/styles";

function Layouts({ title, children, description }) {
  const classes = myStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title}-walesecom` : `walesecom`}</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.nav_typo}>walesecom</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
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
