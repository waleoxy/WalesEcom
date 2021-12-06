import { makeStyles } from "@material-ui/core";

export const myStyles = makeStyles({
  navbar: {
    backgroundColor: "#000000",
    "& a": {
      color: "ffffff",
      marginLeft: 9,
    },
  },
  main: {
    height: "80vh",
  },
  footer: {
    textAlign: "center",
  },
});
