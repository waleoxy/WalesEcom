import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layouts from "../components/Layouts";
import { myStyles } from "../components/utils/styles";
import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../components/utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from "../components/utils/error";

function Register() {
  const classes = myStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      closeSnackbar();
      enqueueSnackbar("Passwords didnt match", { variant: "errors" });
      return;
    } else {
      try {
        const { data } = await axios.post("/api/users/register", {
          name,
          email,
          password,
          confirmPassword,
        });
        dispatch({ type: "USER_LOGIN", payload: data });
        Cookies.set("userInfo", data);
        router.push(redirect || "/");
      } catch (error) {
        enqueueSnackbar(getError(error), { variant: "errors" });
      }
    }
  };

  return (
    <Layouts title="Register">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="name"
                  fullWidth
                  label="Name"
                  variant="outlined"
                  InputProps={{ type: "name" }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name should be more than 2"
                        : "Name is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9.z_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  InputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  id="password"
                  fullWidth
                  label="Password"
                  variant="outlined"
                  InputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password should be more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>{" "}
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  id="confirmPassword"
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  InputProps={{ type: "password" }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "minLength"
                        ? "Confirm Password should be more than 5"
                        : "Confirm Password is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              <Link> Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layouts>
  );
}

export default Register;
