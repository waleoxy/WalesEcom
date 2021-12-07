import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  MuiThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import { myStyles } from "./utils/styles";

function Layouts({ title, children, description }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = myStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title}-walesecom` : `walesecom`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
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
      </MuiThemeProvider>
    </div>
  );
}

export default Layouts;
