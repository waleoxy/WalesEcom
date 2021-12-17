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
import Layouts from "../components/Layouts";
import db from "../components/utils/db";
import { myStyles } from "../components/utils/styles";
import Product from "../model/Product";
//import { getData } from "../components/utils/data";

export default function Home({ products }) {
  const classes = myStyles();
  console.log("ps", products);
  return (
    <Layouts>
      <div>
        <h1>Row of list of featured products slide</h1>
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
                  <Button size="small" color="primary">
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
