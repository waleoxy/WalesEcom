import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "../components/utils/store";
import Layouts from "../components/Layouts";
import CheckoutHelper from "../components/CheckoutHelper";
import { myStyles } from "../components/utils/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

function Payment() {
  const classes = myStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMathod") || "");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Layouts title="Payment Mthod">
      <CheckoutHelper activeStep={2}></CheckoutHelper>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="outlined" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="outlined"
              onClick={() => router.push("/shipping")}>
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layouts>
  );
}

export default Payment;
