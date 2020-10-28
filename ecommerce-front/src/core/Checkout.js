import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Search from "./Search";
import ProductCard from "./Card";
import { getProducts } from "./apiCore";
import { Row, Col, Button } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout =({products}) => {

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
   
    return isAuthenticated() ? (
        <Button variant="success">
          Checkout
        </Button>
      ) : (
        <Link to="/signin">
          <Button variant="info">
            Sign In to Checkout
          </Button>
        </Link>
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