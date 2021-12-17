import Layouts from "../../components/Layouts";
import NextLink from "next/link";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { myStyles } from "../../components/utils/styles";
import Image from "next/image";
import db from "../../components/utils/db";
import Product from "../../model/Product";
import { Store } from "../../components/utils/store";
import { useContext } from "react";

export default function ProductScreen({ product, params }) {
  const classes = myStyles();
  const { dispatch } = useContext(Store);

  console.log("pto6", product, params);

  const addToCartHandler = async () => {
    const data = await fetch(`/api/products/${product._id}`);
    console.log("d", data);
    // if (data.rating.count <= 0) {
    //   window.alert("Product out of stock");
    // }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  return (
    <Layouts title={product.title} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>back to product</Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.title}
            height={420}
            width={550}
            layout="fixed"></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.title}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Rating: {product.rating.rate}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Reviews: {product.rating.count}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>$ {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.rating.count > 0 ? `In stock` : "Out of stock"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}>
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { productScreen } = params;

  console.log("p", params);

  await db.connect();
  const singleProduct = await Product.findOne({ _id: productScreen }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocTObj(singleProduct),
    },
  };
};
