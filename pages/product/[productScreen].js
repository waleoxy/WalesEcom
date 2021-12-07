import { useRouter } from "next/router";
//import { getData } from "../../components/utils/data";
import React, { useEffect, useState } from "react";
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

export default function ProductScreen({ product }) {
  const classes = myStyles();

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
                <Button fullWidth variant="contained" color="primary">
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

export const getStaticPaths = async () => {
  const productList = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    fallback: false,
    paths: productList.map((product) => ({
      params: {
        productScreen: product.id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (ctx) => {
  const productId = ctx.params.productScreen;

  const productList = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const singleProduct = productList.find(
    (product) => product.id === Number(productId)
  );

  return {
    props: {
      product: singleProduct,
    },
  };
};
