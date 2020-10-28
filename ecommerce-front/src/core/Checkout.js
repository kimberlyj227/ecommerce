import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Search from "./Search";
import ProductCard from "./Card";
import { getProducts, getBraintreeClientToken } from "./apiCore";
import { Row, Col, Button } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout =({products}) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token)
  }, [])


  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(res => {
      if(res.error) {
        setData({...data, error: res.error})
      } else {
        setData({
          ...data,
          clientToken: res.clientToken
        })
      }
    })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
   
    return isAuthenticated() ? (
        <div >
          {showDropIn()}
        </div>
      ) : (
        <Link to="/signin">
          <Button variant="info">
            Sign In to Checkout
          </Button>
        </Link>
      )
    
  }

  const showDropIn = () => {
    return (
      <div>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn options={{
              authorization: data.clientToken,

            }} onInstance={instance => (data.instance = instance)}
            />
            <Button variant="success">
              Checkout
            </Button>
          </div>

        ) : null}
      </div>
    )
  }


  return (
    <div>
      <h2> Total: ${getTotal()}</h2>
      {showCheckout()}

    </div>
  )
}

export default Checkout;