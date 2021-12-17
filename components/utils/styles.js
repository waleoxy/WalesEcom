import { makeStyles } from "@material-ui/core";
import { blue, blueGrey } from "@material-ui/core/colors";

export const myStyles = makeStyles({
  navbar: {
    backgroundColor: "#000000",
    "& a": {
      color: "ffffff",
      marginLeft: 9,
    },
  },
  nav_typo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#aee5cf",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 15,
    textAlign: "center",
  },
  card: {
    height: 380,
    width: 300,
    borderRadius: 30,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  image: {
    paddingTop: 9,
    height: 250,
    objectFit: "contain",
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
    textTransform: "uppercase",
    border: "1px solid black",
    borderRadius: 15,
    width: 155,
    paddingInline: 5,
    paddingBlock: 5,
    textAlign: "center",
    backgroundColor: "#e5e5e5",
  },
});
