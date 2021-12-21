import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Layouts from "../components/Layouts";
import { myStyles } from "../components/utils/styles";
import NextLink from "next/link";

function Login() {
  const classes = myStyles();

  return (
    <Layouts title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              id="email"
              fullWidth
              label="Email"
              variant="outlined"
              InputProps={{ type: "email" }}></TextField>
          </ListItem>
          <ListItem>
            <TextField
              id="password"
              fullWidth
              label="Password"
              variant="outlined"
              InputProps={{ type: "password" }}></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?
            <NextLink href="/register" passHref>
              <Link> Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layouts>
  );
}

export default Login;
