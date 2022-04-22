import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layouts from "../components/Layouts";
import { myStyles } from "../components/utils/styles";
// import NextLink from "next/link";
import { useRouter } from "next/router";
import { Store } from "../components/utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutHelper from "../components/CheckoutHelper";

function Shipping() {
  const classes = myStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const router = useRouter();
  //const { redirect } = router.query;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, []);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push("/payment");
  };

  return (
    <Layouts title="Shipping Address">
      <CheckoutHelper activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="fullName"
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name should be more than 2"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="address"
                  fullWidth
                  label="Address"
                  variant="outlined"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address should be more than 2"
                        : "Address is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="city"
                  fullWidth
                  label="City"
                  variant="outlined"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City should be more than 2"
                        : "City is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="postalCode"
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "minLength"
                        ? "Postal Code should be more than 2"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="country"
                  fullWidth
                  label="Country"
                  variant="outlined"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country should be more than 2"
                        : "Country is required"
                      : ""
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layouts>
  );
}

export default Shipping;
