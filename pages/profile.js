import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Store } from "../components/utils/store";
import axios from "axios";
import { getError } from "../components/utils/error";
import Layouts from "../components/Layouts";
import NextLink from "next/link";
import {
  Card,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { myStyles } from "../components/utils/styles";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

function Profile() {
  const classes = myStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords didnt match", { variant: "errors" });
      return;
    } else {
      try {
        const { data } = await axios.put(
          "/api/users/profile",
          {
            name,
            email,
            password,
            confirmPassword,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "USER_LOGIN", payload: data });
        Cookies.set("userInfo", data);
        enqueueSnackbar("Profile updated successfully", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(getError(error), { variant: "errors" });
      }
    }
  };

  return (
    <Layouts title="Profile">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Profile
                </Typography>
              </ListItem>
              <ListItem>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={classes.form}>
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
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Password should be more than 5",
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
                                ? "Password should be more than 5"
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
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Confirm Password should be more than 5",
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
                                ? "Confirm Password should be more than 5"
                                : ""
                            }
                            {...field}></TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary">
                        Update
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
}

export default dynamic(() => Promise.resolve(Profile, { ssr: false }));
