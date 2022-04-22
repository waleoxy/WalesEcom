import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import { useContext } from "react";
import Layouts from "../components/Layouts";
import db from "../components/utils/db";
import { Store } from "../components/utils/store";
import { myStyles } from "../components/utils/styles";
import Product from "../model/Product";
import { useRouter } from "next/router";
//import { getData } from "../components/utils/data";

export default function Home({ products }) {
  const classes = myStyles();

  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = async (product) => {
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
    <Layouts>
      <div className="mt-5">
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.title}>
              <Card className={classes.card}>
                <NextLink href={`/product/${product._id}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      className={classes.image}
                      component="img"
                      image={product.image}
                      title={product.title}></CardMedia>
                    <CardContent>
                      <Typography>{product.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>$ {product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}>
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layouts>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const productList = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: productList.map(db.convertDocTObj),
    },
  };
};
