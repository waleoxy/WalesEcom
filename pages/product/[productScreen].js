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
import { useRouter } from "next/router";

export default function ProductScreen({ product, params }) {
  const router = useRouter();
  const classes = myStyles();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await fetch(`/api/products/${product._id}`).then((res) =>
      res.json()
    );

    if (data.rating.count < quantity) {
      window.alert("Product out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
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
  await db.connect();
  const singleProduct = await Product.findOne({ _id: productScreen }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocTObj(singleProduct),
    },
  };
};
