import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Card,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Layouts from "../components/Layouts";
import { Store } from "../components/utils/store";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { myStyles } from "../components/utils/styles";
import CheckoutHelper from "../components/CheckoutHelper";
import { useSnackbar } from "notistack";
import { getError } from "../components/utils/error";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = (state, action)=>{
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading:true,order:{}, error:''};
    case "FETCH_SUCCESS":
      return {...state, loading:false, order:action.payload, errror:''};
    case "FETCH_FAIL":
      return {...state, loading:false, error:action.payload, order:{} };
    default: state;  
  }
}

function Order({params}) {
  const orderId = params.id
  const classes = myStyles();

  const router = useRouter();
  const { state} = useContext(Store);
  const {
    userInfo,
  } = state;


const [{loading, error, order}, dispatch] = useReducer({loading:true, error:'', order:{}}, reducer)

  useEffect(() => {
    if (!userInfo) {
       return router.push('login');
    }
    const fetchOrder = async () =>{
try {
    dispatch({type: 'FETCH_REQUEST'});
    const { data } = axios.get(`/api/orders/${orderId}`, {
      headers:{ authorization:`Bearer ${userInfo.token}`}
    });
    dispatch({type:"FETCH_SUCCESS", payload:data})

} catch (error) {
    dispatch({type:"FETCH_FAIL", payload:getError(error)})
}
    }
    if (!order || (order && order.id!==orderId)) {
      fetchOrder();
    }
    
  }, [order]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Layouts title={`Order ${orderId}`}>
      <CheckoutHelper activeStep={3}></CheckoutHelper>
      <Typography component="h1" variant="h1">
        Order {orderId}
      </Typography>
      {loading ? (<CircularProgress/>) : error? <Typography className={classes.error}>{error}</Typography>:
       <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postaCode},{" "}
                {shippingAddress.country},
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item._id}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  height={50}
                                  width={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item._id}`} passHref>
                              <Link>
                                <Typography>{item.title}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <Typography>$ {item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Total:</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="right">${totalPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      }
         </Layouts>
  );
}

export const getServerSideProps = async({params}){
  return {props:{params}}
}

export default dynamic(() => Promise.resolve(Order, { ssr: false }));
