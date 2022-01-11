import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import { myStyles } from "./utils/styles";

function CheckoutHelper({ activeStep = 0 }) {
  const classes = myStyles();
  return (
    <Stepper
      className={classes.transparentbg}
      activeStep={activeStep}
      alternativeLabel>
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}

export default CheckoutHelper;
